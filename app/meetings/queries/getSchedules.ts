import db from "db"
import { Ctx } from "blitz"

export default async function getSchedules(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  const schedules = await db.schedule.findMany({
    where: { ownerId: ctx.session.userId },
    include: { dailySchedules: true },
  })

  return schedules
}
