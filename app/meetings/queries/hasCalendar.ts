import db from "db"
import { Ctx } from "blitz"

export default async function hasCalendar(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  const calendar = await db.connectedCalendar.findFirst({
    where: { ownerId: ctx.session.userId },
  })

  if (!calendar) {
    return false
  }
  return true
}
