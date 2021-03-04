/*
  Warnings:

  - Added the required column `defaultConnectedCalendarId` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "defaultConnectedCalendarId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DefaultCalendar" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "calendarId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DefaultCalendar.userId_unique" ON "DefaultCalendar"("userId");

-- AddForeignKey
ALTER TABLE "DefaultCalendar" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultCalendar" ADD FOREIGN KEY("calendarId")REFERENCES "ConnectedCalendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD FOREIGN KEY("defaultConnectedCalendarId")REFERENCES "ConnectedCalendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
