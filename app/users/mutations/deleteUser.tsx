import db from "db"
import { Ctx } from "blitz"

export default async function deleteOneSelf(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  const userId = ctx.session.userId

  await db.booking.deleteMany({
    where: {
      meeting: {
        owner: {
          id: userId,
        },
      },
    },
  })

  await db.meeting.deleteMany({
    where: {
      owner: {
        id: userId,
      },
    },
  })

  await db.dailySchedule.deleteMany({
    where: {
      schedule: {
        ownerId: userId,
      },
    },
  })

  await db.schedule.deleteMany({
    where: { ownerId: userId },
  })

  await db.connectedCalendar.deleteMany({
    where: { ownerId: userId },
  })

  await db.user.delete({
    where: { id: userId },
  })

  await ctx.session.revoke()
}
