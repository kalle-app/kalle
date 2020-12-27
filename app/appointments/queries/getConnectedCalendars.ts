import db from "db"
import { Ctx } from "blitz"

export default async function getConnectedCalendars(userId: number, ctx: Ctx) {
  ctx.session.authorize()

  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: userId },
  })

  return calendars
}
