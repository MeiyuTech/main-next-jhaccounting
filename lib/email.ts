import { Resend } from "resend";

export type ContactSubmissionNotification = {
  name: string;
  email: string;
  phone?: string;
  wechat?: string;
  address?: string;
  message: string;
  created_at?: string;
};

type NotificationResult =
  | { sent: true; id?: string }
  | { sent: false; reason: "not_configured" };

const defaultFrom = "Jiahua Website <forms@jhaccounting.org>";
const defaultTo = "info@jhaccounting.org";

function cleanSubjectValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
}

export async function sendContactSubmissionNotification(
  submission: ContactSubmissionNotification,
): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { sent: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const isFundingLead = submission.message.startsWith(
    "Government Funding Eligibility Assessment",
  );
  const cleanName = cleanSubjectValue(submission.name || "Unknown contact");
  const subject = isFundingLead
    ? `New government funding inquiry — ${cleanName}`
    : `New website form submission — ${cleanName}`;
  const text = [
    "A new form was submitted on jhaccounting.org.",
    "",
    `Name: ${submission.name || "Not provided"}`,
    `Email: ${submission.email || "Not provided"}`,
    `Phone: ${submission.phone || "Not provided"}`,
    `WeChat: ${submission.wechat || "Not provided"}`,
    `State / address: ${submission.address || "Not provided"}`,
    `Submitted at: ${submission.created_at || new Date().toISOString()}`,
    "",
    "Submission details:",
    submission.message,
  ].join("\n");

  const { data, error } = await resend.emails.send({
    from: process.env.CONTACT_FORM_EMAIL_FROM || defaultFrom,
    to: [process.env.CONTACT_FORM_EMAIL_TO || defaultTo],
    replyTo: submission.email || undefined,
    subject,
    text,
  });

  if (error) {
    throw new Error(`Resend notification failed: ${error.message}`);
  }

  return { sent: true, id: data?.id };
}
