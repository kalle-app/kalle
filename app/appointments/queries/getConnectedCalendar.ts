import db from "db"

export default async function getConnectedCalendar(id: number) {
  const calendar = await db.connectedCalendar.findFirst({
    where: { id: id },
  })

  return calendar
}
