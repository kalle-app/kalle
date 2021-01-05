import db, { Meeting } from "db"
import { Ctx } from "blitz"

export default async function getBookings(meetingId: number, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const meeting = await db.meeting.findFirst({
    where: { id: meetingId },
  })

  if (!meeting) {
    throw new Error("An error occured: Meeting does not exist.")
  }

  console.log(meeting)

  const meetingOwner = await db.user.findFirst({
    where: { username: meeting.ownerName },
  })

  if (!meetingOwner) {
    throw new Error("An error occured: Meeting owner does not exist")
  }

  if (ctx.session.userId != meetingOwner.id) {
    throw new Error("An error occured: You are not authorized to see this information")
  }

  const bookings = await db.booking.findMany({
    where: { meetingId: meeting.id },
  })

  return bookings
}
