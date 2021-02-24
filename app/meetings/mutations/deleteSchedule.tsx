import db from "db"
import { Ctx } from "blitz"

export default async function deleteSchedule(scheduleId: number, ctx: Ctx) {
  ctx.session.authorize()

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) {
    throw new Error("Invariant failed: Owner does not exist.")
  }

  const meetings = await db.meeting.findMany({
    where: { scheduleId: scheduleId },
  })

  if (meetings.length === 0) {
    await db.dailySchedule.deleteMany({
      where: { scheduleId: scheduleId },
    })
    await db.schedule.delete({
      where: { id: scheduleId },
    })
    return "success"
  }
  return "error"
}
