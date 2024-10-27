/*
  Warnings:

  - Added the required column `status` to the `EmployeeJob` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "EmployeeJob" ADD COLUMN     "status" "ApplicationStatus" NOT NULL;
