/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `receiverEmail` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderEmail` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_senderId_fkey";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "receiverEmail" TEXT NOT NULL,
ADD COLUMN     "senderEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderEmail_fkey" FOREIGN KEY ("senderEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverEmail_fkey" FOREIGN KEY ("receiverEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
