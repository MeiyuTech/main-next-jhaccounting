import { beforeEach, describe, expect, it, vi } from "vitest";

import { createClient } from "@/utils/supabase/server";
import { sendContactSubmissionNotification } from "@/lib/email";

import { createContactSubmission } from "./actions";

vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/email", () => ({
  sendContactSubmissionNotification: vi.fn(),
}));

const submission = {
  name: "Jamie Chen",
  email: "jamie@example.com",
  phone: "949-555-0100",
  wechat: "",
  address: "CA",
  message: "Government Funding Eligibility Assessment",
};

describe("createContactSubmission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(sendContactSubmissionNotification).mockResolvedValue({
      sent: true,
      id: "email_123",
    });
  });

  it("writes the V4 funding lead to contact_submissions", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    vi.mocked(createClient).mockResolvedValue({ from } as never);

    await expect(createContactSubmission(submission)).resolves.toEqual({
      success: true,
      emailNotificationSent: true,
    });
    expect(from).toHaveBeenCalledWith("contact_submissions");
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        ...submission,
        created_at: expect.any(String),
      }),
    );
    expect(sendContactSubmissionNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        ...submission,
        created_at: expect.any(String),
      }),
    );
  });

  it("keeps a saved lead successful when the email notification fails", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    vi.mocked(createClient).mockResolvedValue({ from } as never);
    vi.mocked(sendContactSubmissionNotification).mockRejectedValue(
      new Error("Resend unavailable"),
    );

    await expect(createContactSubmission(submission)).resolves.toEqual({
      success: true,
      emailNotificationSent: false,
    });
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("surfaces a failed Supabase insert to the form", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const insert = vi.fn().mockResolvedValue({ error: new Error("denied") });
    const from = vi.fn().mockReturnValue({ insert });
    vi.mocked(createClient).mockResolvedValue({ from } as never);

    await expect(createContactSubmission(submission)).rejects.toThrow(
      "Failed to create contact submission",
    );
    expect(consoleError).toHaveBeenCalled();
    expect(sendContactSubmissionNotification).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
