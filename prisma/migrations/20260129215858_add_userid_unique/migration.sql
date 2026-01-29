/*
  Warnings:

  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'guest');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'guest',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vaccinated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "bio" SET DEFAULT 'Hi there ! My name is ${username} and i like bananas with chocolate.';
