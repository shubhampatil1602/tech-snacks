// prisma/seed.ts
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth/auth";

async function main() {
  // Check if super admin already exists
  const existing = await prisma.user.findUnique({
    where: { email: process.env.SUPER_ADMIN_EMAIL! },
  });

  if (existing) {
    console.log("Super admin already exists, skipping seed.");
    return;
  }

  // Create super admin via Better Auth
  const result = await auth.api.signUpEmail({
    body: {
      name: "Super Admin",
      email: process.env.SUPER_ADMIN_EMAIL!,
      password: process.env.SUPER_ADMIN_PASSWORD!,
    },
  });

  if (!result?.user) {
    throw new Error("Failed to create super admin");
  }

  // Set global role to super_admin
  await prisma.user.update({
    where: { id: result.user.id },
    data: { role: "super_admin" },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
