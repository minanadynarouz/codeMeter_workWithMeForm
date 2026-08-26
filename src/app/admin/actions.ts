"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { STATUS_OPTIONS } from "@/lib/submission-options";

const VALID_STATUSES = new Set(STATUS_OPTIONS.map((o) => o.value));

export async function updateSubmissionStatus(id: string, status: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authorized.");
  }

  if (!VALID_STATUSES.has(status as never)) {
    throw new Error("Invalid status.");
  }

  await prisma.submission.update({
    where: { id },
    data: { status: status as never },
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/${id}`);
}
