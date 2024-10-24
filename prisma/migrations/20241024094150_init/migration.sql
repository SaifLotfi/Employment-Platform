-- CreateEnum
CREATE TYPE "ExpLevel" AS ENUM ('Intern', 'Junior', 'MidLevel', 'Senior', 'Lead', 'Architect');

-- CreateTable
CREATE TABLE "Employee" (
    "empId" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "expLevel" "ExpLevel" NOT NULL,
    "password" TEXT NOT NULL,
    "numberOfViews" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("empId")
);

-- CreateTable
CREATE TABLE "Employer" (
    "empId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "compId" TEXT NOT NULL,

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("empId")
);

-- CreateTable
CREATE TABLE "Company" (
    "compId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("compId")
);

-- CreateTable
CREATE TABLE "Job" (
    "jobId" TEXT NOT NULL,
    "empId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expLevel" "ExpLevel" NOT NULL,
    "salary" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("jobId")
);

-- CreateTable
CREATE TABLE "PragrammingLanguage" (
    "langId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "empId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "PragrammingLanguage_pkey" PRIMARY KEY ("langId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_nationalId_key" ON "Employee"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_email_key" ON "Employer"("email");

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Company"("compId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Employer"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PragrammingLanguage" ADD CONSTRAINT "PragrammingLanguage_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Employee"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PragrammingLanguage" ADD CONSTRAINT "PragrammingLanguage_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;
