import db from "db"
import { Ctx } from "blitz"

export default async function getCalendars(_ = null, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: ctx.session.userId },
  })

  return calendars
}
