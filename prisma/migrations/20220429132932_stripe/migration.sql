/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeCustomerId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `stripeCustomerId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_stripeCustomerId_key` ON `users`(`stripeCustomerId`);
