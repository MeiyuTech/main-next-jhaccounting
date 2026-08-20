import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const resendMocks = vi.hoisted(() => ({
  constructor: vi.fn(),
  send: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: resendMocks.constructor.mockImplementation(() => ({
    emails: { send: resendMocks.send },
  })),
}));

import { sendContactSubmissionNotification } from "./email";

const submission = {
  name: "Jamie Chen",
  email: "jamie@example.com",
  phone: "949-555-0100",
  address: "CA",
  message: "Government Funding Eligibility Assessment",
  created_at: "2026-08-20T12:00:00.000Z",
};

describe("sendContactSubmissionNotification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FORM_EMAIL_FROM;
    delete process.env.CONTACT_FORM_EMAIL_TO;
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FORM_EMAIL_FROM;
    delete process.env.CONTACT_FORM_EMAIL_TO;
  });

  it("skips email cleanly when Resend is not configured", async () => {
    await expect(sendContactSubmissionNotification(submission)).resolves.toEqual(
      { sent: false, reason: "not_configured" },
    );
    expect(resendMocks.constructor).not.toHaveBeenCalled();
  });

  it("emails info@jhaccounting.org from the verified domain", async () => {
    process.env.RESEND_API_KEY = "re_test";
    resendMocks.send.mockResolvedValue({
      data: { id: "email_123" },
      error: null,
    });

    await expect(sendContactSubmissionNotification(submission)).resolves.toEqual(
      { sent: true, id: "email_123" },
    );
    expect(resendMocks.constructor).toHaveBeenCalledWith("re_test");
    expect(resendMocks.send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "Jiahua Website <forms@jhaccounting.org>",
        to: ["info@jhaccounting.org"],
        replyTo: "jamie@example.com",
        subject: "New government funding inquiry — Jamie Chen",
      }),
    );
  });
});
