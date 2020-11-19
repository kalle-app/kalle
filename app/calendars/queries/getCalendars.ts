import db from "db"
import { SessionContext } from "blitz"

export default async function getCalendars(_ = null, ctx: { session?: SessionContext } = {}) {
  if (!ctx.session?.userId) return null

  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: ctx.session.userId },
  })

  return calendars
}
