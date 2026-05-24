-- AlterTable
ALTER TABLE "menu_item" ADD COLUMN     "menuCategoryId" TEXT;

-- CreateTable
CREATE TABLE "menu_category" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "menu_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_category" ADD CONSTRAINT "menu_category_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
