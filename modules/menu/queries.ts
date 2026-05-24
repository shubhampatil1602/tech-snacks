import { prisma } from "@/lib/db";

export async function getMenuItems(organizationId: string) {
  const items = await prisma.menuItem.findMany({
    where: { organizationId },
    include: { menuCategory: true },

    orderBy: { createdAt: "desc" },
  });

  return items.map((item) => ({
    ...item,
    price: item.price.toString(),
  }));
}

export async function getMenuCategories(organizationId: string) {
  return await prisma.menuCategory.findMany({
    where: { organizationId },
    orderBy: { createdAt: "asc" },
  });
}
