-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_fileid_fkey";

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "fileid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fileid_fkey" FOREIGN KEY ("fileid") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
