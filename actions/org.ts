"use server";

import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db";
import { requireSuperAdmin } from "./user";
import { createOrgSchema, type CreateOrgSchema } from "@/types/org";
import { nanoid } from "nanoid";
import { CreateOrgResult } from "@/types/org";
import { hashPassword } from "better-auth/crypto";

export async function createOrgAction(
  input: CreateOrgSchema,
): Promise<CreateOrgResult> {
  await requireSuperAdmin();

  const parsed = createOrgSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const { orgName, orgSlug, adminName, adminEmail, adminPassword } =
    parsed.data;

  const slugTaken = await prisma.organization.findUnique({
    where: { slug: orgSlug },
  });
  if (slugTaken) {
    return { success: false, error: "Organization slug already taken" };
  }

  const emailTaken = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (emailTaken) {
    return { success: false, error: "Admin email is already registered" };
  }

  const inviteCode = nanoid(8).toUpperCase();

  // Create admin user directly via Prisma
  // to avoids signUpEmail which hijacks the current session cookie
  const hashedPassword = await hashPassword(adminPassword);
  const adminId = nanoid();

  const adminUser = await prisma.user.create({
    data: {
      id: adminId,
      name: adminName,
      email: adminEmail,
      emailVerified: false,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Better Auth stores passwords on the account table, not user
  await prisma.account.create({
    data: {
      id: nanoid(),
      accountId: adminUser.id,
      providerId: "credential",
      userId: adminUser.id,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create org via Better Auth
  const org = await auth.api.createOrganization({
    body: {
      name: orgName,
      slug: orgSlug,
      userId: adminUser.id,
      inviteCode,
    },
  });

  if (!org) {
    return { success: false, error: "Failed to create organization" };
  }

  return {
    success: true,
    data: {
      orgName: org.name,
      orgSlug: org.slug,
      inviteCode,
      adminEmail,
      adminPassword,
    },
  };
}
