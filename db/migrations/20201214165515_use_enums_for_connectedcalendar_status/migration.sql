/*
  Warnings:

  - You are about to alter the column `status` on the `ConnectedCalendar` table. The data in that column could be lost. The data in that column will be cast from `String` to `Enum("ConnectedCalendarStatus")`.

*/
-- CreateEnum
CREATE TYPE "public"."ConnectedCalendarStatus" AS ENUM ('active');

-- AlterTable
ALTER TABLE "ConnectedCalendar" ALTER COLUMN "status" SET DATA TYPE "ConnectedCalendarStatus" USING('active'::"ConnectedCalendarStatus");
