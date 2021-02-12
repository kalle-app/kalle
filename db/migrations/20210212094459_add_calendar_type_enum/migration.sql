UPDATE "ConnectedCalendar" SET "type" = 'CaldavDigest' WHERE "type" = 'CalDav';
UPDATE "ConnectedCalendar" SET "type" = 'GoogleCalendar' WHERE "type" = 'Google Calendar';

CREATE TYPE "ConnectedCalendarType" AS ENUM ('CaldavDigest', 'CaldavBasic', 'GoogleCalendar');
ALTER TABLE "ConnectedCalendar" ALTER COLUMN "type" SET DATA TYPE "ConnectedCalendarType" USING "type"::"ConnectedCalendarType";
