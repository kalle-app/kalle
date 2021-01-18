import db from "db"
import { Ctx } from "blitz"

export default async function deleteConnectedCalendar(calendarId: number, ctx: Ctx) {
  ctx.session.authorize()

  const count = await db.connectedCalendar.deleteMany({
    where: { id: calendarId, ownerId: ctx.session.userId },
  })

  return count
}
