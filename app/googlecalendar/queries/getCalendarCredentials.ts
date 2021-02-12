import db from "db"

export default async function getCalendarCredentials(userId: number) {
  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: userId, type: "GoogleCalendar" },
  })
  return calendars
}
