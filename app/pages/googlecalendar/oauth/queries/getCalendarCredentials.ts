import db from "db"
import { Ctx } from "blitz"

export default async function getCalendarCredentials(ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const calendars = await db.calendarCredentials.findMany({
    where: { ownerId: ctx.session.userId },
  })

  return calendars
}