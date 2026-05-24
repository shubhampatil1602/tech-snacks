import { prisma } from "@/lib/db";

export async function getAllOrganizations() {
  return await prisma.organization.findMany({
    include: {
      members: {
        where: { role: "owner" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      _count: {
        select: { members: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
