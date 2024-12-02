/*
  Warnings:

  - Added the required column `word` to the `Info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Word" AS ENUM ('Developer', 'Engineer');

-- AlterTable
ALTER TABLE "Info" ADD COLUMN     "homeImageUrl" TEXT NOT NULL DEFAULT 'https://static7.tgstat.ru/channels/_0/bc/bc8ed4944ea88e1bdf520898b60b5ac6.jpg',
ADD COLUMN     "word" "Word" NOT NULL,
ALTER COLUMN "mainRole" SET DEFAULT 'Full stack Developer',
ALTER COLUMN "moto" SET DEFAULT 'I create full-stack products that people love, with a focus on user experience and scalable architecture.';

-- AlterTable
ALTER TABLE "Links" ALTER COLUMN "linkedIn" SET DEFAULT 'https://www.linkedin.com/in/yeabsra-ashebir-tech-nerd-8a3a80267/',
ALTER COLUMN "x" SET DEFAULT 'x.com/technerd556',
ALTER COLUMN "github" SET DEFAULT 'github.com/yeabnoah',
ALTER COLUMN "telegram" SET DEFAULT 't.me/technerd345',
ALTER COLUMN "website" SET DEFAULT 'https://technerd.345';
