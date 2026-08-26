import { Resend } from "resend";
import type { Submission } from "@prisma/client";
import { productTypeLabel, brandAssetsLabel, yesNoLabel } from "@/lib/submission-options";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendNewSubmissionEmail(submission: Submission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn(
      "Resend is not configured (RESEND_API_KEY / ADMIN_NOTIFICATION_EMAIL / RESEND_FROM_EMAIL missing) — skipping notification email."
    );
    return;
  }

  const resend = new Resend(apiKey);

  const rows: [string, string][] = [
    ["Name", submission.fullName],
    ["Company", submission.companyName],
    ["Email", submission.email],
    ["Phone", submission.phone],
    ["Product type", productTypeLabel(submission.productType)],
    ["Company description", submission.companyDescription],
    ["Wants admin panel", yesNoLabel(submission.wantsAdminPanel)],
    ["Brand assets", brandAssetsLabel(submission.brandAssetsStatus)],
    [
      "Reference",
      submission.hasReference === "YES" ? submission.referenceLink ?? "(link missing)" : "No reference, wants to discuss",
    ],
    [
      "Domain",
      submission.hasDomain === "YES" ? submission.domainName ?? "(name missing)" : "Does not own a domain yet",
    ],
    ["Budget", submission.budgetRange || "Not specified"],
    ["Timeline", submission.timeline || "Not specified"],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px;font-size:14px;color:#111827;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  await resend.emails.send({
    from,
    to,
    subject: `New project request for Mina Bekheet — ${submission.companyName}`,
    html: `
      <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#111827;">New project request</h2>
        <p style="color:#374151;">A new contact form submission just came in.</p>
        <table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${htmlRows}
        </table>
        <p style="margin-top:16px;">
          <a href="${process.env.NEXTAUTH_URL ?? ""}/admin" style="color:#4f46e5;">Open the admin dashboard</a>
        </p>
      </div>
    `,
  });
}
