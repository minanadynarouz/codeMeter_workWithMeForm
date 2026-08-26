import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { SubmissionStatus } from "@prisma/client";

export const PATCH = auth(async (req, ctx) => {
  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await ctx?.params;
  const id = params?.id as string;
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    const { status } = await req.json();
    if (!status || !Object.values(SubmissionStatus).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: { status: status as SubmissionStatus },
    });

    return NextResponse.json({ ok: true, submission: updated });
  } catch (error) {
    console.error("Failed to update status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}) as any;

export const DELETE = auth(async (req, ctx) => {
  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await ctx?.params;
  const id = params?.id as string;
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    await prisma.submission.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete submission:", error);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}) as any;
