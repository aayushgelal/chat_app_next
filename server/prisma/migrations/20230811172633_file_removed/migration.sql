/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `file` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_messageId_fkey";

-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "file" TEXT NOT NULL;

-- DropTable
DROP TABLE "File";
