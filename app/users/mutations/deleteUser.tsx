import db from "db"
import { Ctx } from "blitz"

export default async function deleteUser(userId: number, ctx: Ctx) {
  ctx.session.authorize()

  let user = await db.user.findUnique({
    where: { id: userId },
  })

  const bookings = await db.booking.deleteMany({
    where: {
      meeting: {
        ownerName: user?.username,
      },
    },
  })

  const meetings = await db.meeting.deleteMany({
    where: { ownerName: user?.username },
  })

  const dailySchedules = await db.dailySchedule.deleteMany({
    where: {
      schedule: {
        ownerId: userId,
      },
    },
  })

  const schedules = await db.schedule.deleteMany({
    where: { ownerId: userId },
  })

  const calendars = await db.connectedCalendar.deleteMany({
    where: { ownerId: userId },
  })

  user = await db.user.delete({
    where: { id: userId },
  })

  return user
}
