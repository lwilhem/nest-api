/*
  Warnings:

  - You are about to drop the column `Stock` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `Stock`,
    ADD COLUMN `picture` LONGBLOB NULL,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Shop`;

-- CreateTable
CREATE TABLE `shop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NULL,
    `picture` LONGBLOB NULL,

    UNIQUE INDEX `shop_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
