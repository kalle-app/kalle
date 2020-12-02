import db from "db"
import { Ctx } from "blitz"

export default async function getConnectedCalendars(userId: number, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: userId },
  })

  return calendars
}
