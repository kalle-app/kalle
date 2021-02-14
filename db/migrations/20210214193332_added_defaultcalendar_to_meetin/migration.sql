/*
  Warnings:

  - Added the required column `defaultConnectedCalendarId` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "defaultConnectedCalendarId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Meeting" ADD FOREIGN KEY("defaultConnectedCalendarId")REFERENCES "ConnectedCalendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
