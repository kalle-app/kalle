import db from "db"
import { Ctx } from "blitz"

export default async function getSchedules(_ = null, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const schedules = await db.schedule.findMany({
    where: { ownerId: ctx.session.userId },
    include: { dailySchedules: true },
  })

  return schedules
}
