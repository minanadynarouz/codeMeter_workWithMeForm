import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
  name: z.string().trim().optional(),
});

/**
 * One-time admin bootstrap endpoint, gated by the SETUP_SECRET env var.
 * Lets an admin account be created on a production database that this
 * environment can only reach over HTTPS (not raw Postgres).
 */
export async function POST(req: NextRequest) {
  const setupSecret = process.env.SETUP_SECRET;
  if (!setupSecret) {
    return NextResponse.json({ error: "Setup is disabled." }, { status: 404 });
  }

  const providedSecret = req.headers.get("x-setup-secret");
  if (providedSecret !== setupSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const { email, password, name } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email: email.toLowerCase() },
    update: { passwordHash, name },
    create: { email: email.toLowerCase(), passwordHash, name },
  });

  return NextResponse.json({ ok: true, email: admin.email });
}
