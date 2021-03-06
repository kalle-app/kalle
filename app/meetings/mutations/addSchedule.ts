import db from "db"
import { resolver } from "blitz"
import * as z from "zod"

export default resolver.pipe(
  resolver.zod(
    z.object({
      name: z.string(),
      timezone: z.string(),
      schedule: z.record(z.object({ startTime: z.string(), endTime: z.string() })),
    })
  ),
  resolver.authorize(),
  async (scheduleCreate, ctx) => {
    const schedule = await db.schedule.create({
      data: {
        name: scheduleCreate.name,
        timezone: scheduleCreate.timezone,
        owner: {
          connect: { id: ctx.session.userId },
        },
        dailySchedules: {
          create: Object.entries(scheduleCreate.schedule).map(([day, { startTime, endTime }]) => ({
            day,
            startTime,
            endTime,
          })),
        },
      },
    })

    return schedule
  }
)
