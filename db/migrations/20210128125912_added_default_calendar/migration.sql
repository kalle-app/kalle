-- CreateTable
CREATE TABLE "DefaultCalendar" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "calendarId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DefaultCalendar" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultCalendar" ADD FOREIGN KEY("calendarId")REFERENCES "ConnectedCalendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
