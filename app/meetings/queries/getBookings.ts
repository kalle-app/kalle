import db from "db"
import { Ctx } from "blitz"

export default async function getBookings(meetingId: number, ctx: Ctx) {
  ctx.session.$authorize()

  const meeting = await db.meeting.findFirst({
    where: { id: meetingId },
    include: { owner: true, bookings: true },
  })

  if (!meeting || !meeting.owner) {
    throw new Error("An error occured: Meeting not valid")
  }

  if (ctx.session.userId !== meeting.owner.id) {
    throw new Error("An error occured: You are not authorized to see this information")
  }

  return meeting.bookings
}
