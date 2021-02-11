-- AlterTable
ALTER TABLE "Booking" RENAME COLUMN "date" TO "startDateUTC";

-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "timezone";
ALTER TABLE "Meeting" RENAME COLUMN "startDate" TO "startDateUTC";
ALTER TABLE "Meeting" RENAME COLUMN "endDate" TO "endDateUTC";
