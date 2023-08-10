/*
  Warnings:

  - You are about to drop the column `data` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `fileid` on the `Messages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[messageId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_fileid_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "data",
DROP COLUMN "mimeType",
ADD COLUMN     "messageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "fileid";

-- CreateIndex
CREATE UNIQUE INDEX "File_messageId_key" ON "File"("messageId");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
