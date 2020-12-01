import db from "db"
import { Ctx } from "blitz"

export default async function getAvailableSlots(_ = null, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const slots = await db.connectedCalendar.findMany({
    where: { ownerId: ctx.session.userId },
  })

  return slots
}
