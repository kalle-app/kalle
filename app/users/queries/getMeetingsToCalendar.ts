import db from "db"

export default async function getMeetingsToCalendar(calendarId: number) {
  return await db.meeting.findMany({
    where: { defaultConnectedCalendarId: calendarId },
  })
}
