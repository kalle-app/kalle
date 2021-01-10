import db from "db"

export default async function getCalendarCredentials(userId: number) {
  const calendars = await db.calendarCredentials.findMany({
    where: { ownerId: userId },
  })
  return calendars
}