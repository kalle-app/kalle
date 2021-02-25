import db from "db"
import { Ctx } from "blitz"

export default async function deleteConnectedCalendar(calendarId: number, ctx: Ctx) {
  ctx.session.$authorize()

  const result = await db.connectedCalendar.deleteMany({
    where: { id: calendarId, ownerId: ctx.session.userId },
  })

  return result.count === 1 ? "success" : "error"
}
