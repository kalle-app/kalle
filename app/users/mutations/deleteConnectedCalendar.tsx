import db from "db"
import { Ctx } from "blitz"

export default async function deleteConnectedCalendar(calendarId: number, ctx: Ctx) {
  ctx.session.authorize()

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) {
    throw new Error("Invariant failed: Owner does not exist.")
  }

  const calendar = await db.connectedCalendar.delete({
    where: { id: calendarId },
  })

  return calendar
}
