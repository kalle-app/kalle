import db from "db"

export default async function getDefaultCalendarByUser(id: number) {
  const defaultCalendar = await db.connectedCalendar.findFirst({
    where: { id: id },
  })

  if (!defaultCalendar) return null //Todo handle
  return defaultCalendar
}
