/*
  Warnings:

  - You are about to drop the column `empId` on the `PragrammingLanguage` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `PragrammingLanguage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PragrammingLanguage" DROP CONSTRAINT "PragrammingLanguage_empId_fkey";

-- DropForeignKey
ALTER TABLE "PragrammingLanguage" DROP CONSTRAINT "PragrammingLanguage_jobId_fkey";

-- AlterTable
ALTER TABLE "PragrammingLanguage" DROP COLUMN "empId",
DROP COLUMN "jobId";

-- CreateTable
CREATE TABLE "EmployeeJob" (
    "empId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "EmployeeJob_pkey" PRIMARY KEY ("empId","jobId")
);

-- CreateTable
CREATE TABLE "EmployeeLanguage" (
    "empId" TEXT NOT NULL,
    "langId" TEXT NOT NULL,

    CONSTRAINT "EmployeeLanguage_pkey" PRIMARY KEY ("empId","langId")
);

-- CreateTable
CREATE TABLE "JobLanguage" (
    "jobId" TEXT NOT NULL,
    "langId" TEXT NOT NULL,

    CONSTRAINT "JobLanguage_pkey" PRIMARY KEY ("jobId","langId")
);

-- AddForeignKey
ALTER TABLE "EmployeeJob" ADD CONSTRAINT "EmployeeJob_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Employee"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeJob" ADD CONSTRAINT "EmployeeJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeLanguage" ADD CONSTRAINT "EmployeeLanguage_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Employee"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeLanguage" ADD CONSTRAINT "EmployeeLanguage_langId_fkey" FOREIGN KEY ("langId") REFERENCES "PragrammingLanguage"("langId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLanguage" ADD CONSTRAINT "JobLanguage_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLanguage" ADD CONSTRAINT "JobLanguage_langId_fkey" FOREIGN KEY ("langId") REFERENCES "PragrammingLanguage"("langId") ON DELETE RESTRICT ON UPDATE CASCADE;
