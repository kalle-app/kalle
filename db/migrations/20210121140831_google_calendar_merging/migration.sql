-- AlterTable
ALTER TABLE "ConnectedCalendar" ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "caldavAddress" DROP NOT NULL,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "encryptedPassword" DROP NOT NULL;
