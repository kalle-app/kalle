import db from "db"
import { Ctx } from "blitz"

export default async function getDefaultCalendarByUser(_ = null, ctx: Ctx) {
  ctx.session.$authorize()

  const defaultCalendar = await db.defaultCalendar.findFirst({
    where: { userId: ctx.session!.userId },
  })

  if (!defaultCalendar) return null
  return defaultCalendar
}
