/*
  Warnings:

  - Made the column `bio` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "bio" SET NOT NULL;
