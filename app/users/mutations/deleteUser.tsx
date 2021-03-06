import db from "db"
import { resolver } from "blitz"

export default resolver.pipe(resolver.authorize(), async (_ = null, ctx) => {
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

  await db.defaultCalendar.deleteMany({
    where: { userId: userId },
  })

  await db.connectedCalendar.deleteMany({
    where: { ownerId: userId },
  })

  await db.user.delete({
    where: { id: userId },
  })

  await ctx.session.$revoke()
})
