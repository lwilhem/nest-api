/*
  Warnings:

  - A unique constraint covering the columns `[retailerId]` on the table `shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `retailerId` to the `shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shop` ADD COLUMN `retailerId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `shop_retailerId_key` ON `shop`(`retailerId`);

-- AddForeignKey
ALTER TABLE `shop` ADD CONSTRAINT `shop_retailerId_fkey` FOREIGN KEY (`retailerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
