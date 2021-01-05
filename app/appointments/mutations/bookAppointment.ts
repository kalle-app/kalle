import { Ctx } from "blitz"
import db from "db"

interface BookingDetails {
  meetingId: number
  inviteeEmail: string
  date: Date
}

export default async function bookAppointmentMutation(bookingDetails: BookingDetails, ctx: Ctx) {
  console.log("ok")
  ctx.session.authorize()

  const meeting = await db.meeting.findFirst({
    where: { id: bookingDetails.meetingId },
  })

  if (!meeting) {
    throw new Error("An error occured: Meeting does not exist.")
  }

  const booking = await db.booking.create({
    data: {
      meeting: {
        connect: { id: bookingDetails.meetingId },
      },
      inviteeEmail: bookingDetails.inviteeEmail,
      date: bookingDetails.date,
    },
  })

  return booking
}
