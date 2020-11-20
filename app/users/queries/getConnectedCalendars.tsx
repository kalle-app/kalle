import db, { ConnectedCalendar } from "db"
import { Ctx } from "blitz"

export default async function getConnectedCalendars(_ = null, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: ctx.session.userId },
  })

  return calendars
}
