import db from "db"

export default async function getConnectedCalendars(userId: number) {
  // const calendars = await db.connectedCalendar.findMany({
  //   where: { ownerId: calendarOwner.id },
  // })
  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: userId },
  })

  return calendars
}
