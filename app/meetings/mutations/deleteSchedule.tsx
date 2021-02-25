import db from "db"
import { resolver } from "blitz"
import * as z from "zod"

export default resolver.pipe(resolver.zod(z.number()), resolver.authorize(), async (scheduleId) => {
  const meetingsDependingOnSchedule = await db.meeting.count({
    where: { scheduleId: scheduleId },
  })

  if (meetingsDependingOnSchedule > 0) {
    return "error"
  }

  await db.dailySchedule.deleteMany({
    where: { scheduleId: scheduleId },
  })
  await db.schedule.delete({
    where: { id: scheduleId },
  })

  return "success"
})
