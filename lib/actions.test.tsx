import { beforeEach, describe, expect, it, vi } from "vitest";

import { createClient } from "@/utils/supabase/server";

import { createContactSubmission } from "./actions";

vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn(),
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
  });

  it("writes the V4 funding lead to contact_submissions", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    vi.mocked(createClient).mockResolvedValue({ from } as never);

    await expect(createContactSubmission(submission)).resolves.toEqual({
      success: true,
    });
    expect(from).toHaveBeenCalledWith("contact_submissions");
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        ...submission,
        created_at: expect.any(String),
      }),
    );
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
    consoleError.mockRestore();
  });
});
