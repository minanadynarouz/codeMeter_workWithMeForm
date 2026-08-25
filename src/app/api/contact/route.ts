import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { prisma } from "@/lib/prisma";
import { sendNewSubmissionEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const submission = await prisma.submission.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      productType: data.productType,
      companyDescription: data.companyDescription,
      wantsAdminPanel: data.wantsAdminPanel,
      brandAssetsStatus: data.brandAssetsStatus,
      hasReference: data.hasReference,
      referenceLink: data.hasReference === "YES" ? data.referenceLink || null : null,
      hasDomain: data.hasDomain,
      domainName: data.hasDomain === "YES" ? data.domainName || null : null,
      budgetRange: data.budgetRange || null,
      timeline: data.timeline || null,
    },
  });

  try {
    await sendNewSubmissionEmail(submission);
  } catch (err) {
    console.error("Failed to send notification email:", err);
  }

  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
}
