-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('WEBSITE', 'SAAS_APPLICATION', 'APPLICATION', 'THREE_D_WEBSITE', 'AUTOMATION', 'AI_AGENT_APP');

-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "BrandAssetsStatus" AS ENUM ('HAVE_ALL', 'PARTIAL', 'NEED_ALL', 'PENDING_FROM_OTHER_PARTY');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_DISCUSSION', 'PROPOSAL_SENT', 'WON', 'LOST', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "productType" "ProductType" NOT NULL,
    "companyDescription" TEXT NOT NULL,
    "wantsAdminPanel" "YesNo" NOT NULL,
    "brandAssetsStatus" "BrandAssetsStatus" NOT NULL,
    "hasReference" "YesNo" NOT NULL,
    "referenceLink" TEXT,
    "hasDomain" "YesNo" NOT NULL,
    "domainName" TEXT,
    "budgetRange" TEXT,
    "timeline" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "adminComment" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Submission_status_idx" ON "Submission"("status");

-- CreateIndex
CREATE INDEX "Submission_createdAt_idx" ON "Submission"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
