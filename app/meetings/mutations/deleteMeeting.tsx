import db from "db"
import { NotFoundError, resolver } from "blitz"
import * as z from "zod"

export default resolver.pipe(
  resolver.zod(z.number()),
  resolver.authorize(),
  async (meetingId, ctx) => {
    const meeting = await db.meeting.findFirst({
      where: { id: meetingId, owner: { id: ctx.session.userId } },
      include: { bookings: true },
    })

    if (!meeting) {
      throw new NotFoundError()
    }

    const isAlreadyBooked = meeting.bookings.length > 0
    if (isAlreadyBooked) {
      return "error"
    }

    await db.booking.deleteMany({ where: { meetingId } })
    await db.meeting.delete({ where: { id: meetingId } })
  }
)
