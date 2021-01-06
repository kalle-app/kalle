import db from "db"
import { Ctx } from "blitz"

export default async function getCalendarCredentials(_ = null, ctx: Ctx) {
  console.log("0.1", ctx.session)
  console.log(ctx.session.userId)
  console.log("1")
  if (!ctx.session?.userId) return null
  console.log("2")
  const calendars = await db.calendarCredentials.findMany({
    where: { ownerId: ctx.session.userId },
  })
  console.log("3")
  console.log(calendars)

  return calendars
}
