/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId]` on the table `DefaultCalendar`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DefaultCalendar.userId_unique" ON "DefaultCalendar"("userId");
