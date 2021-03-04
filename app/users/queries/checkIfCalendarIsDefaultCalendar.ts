import db from "db"

export default async function checkIfCalendarIsDefaultCalendar(calendarId: number) {
  const calendar = await db.defaultCalendar.findFirst({
    where: { calendarId: calendarId },
  })
  if (calendar) {
    return true
  } else {
    return false
  }
}
