import { getEmailService } from "app/email"
import { Ctx } from "blitz"
import db, { Booking, Meeting, User } from "db"

async function sendCancellationMail(booking: Booking, meeting: Meeting & { owner: User }) {
  const startMonth = (booking.startDateUTC.getMonth() + 1).toString()
  await getEmailService().send({
    template: "cancellation",
    message: {
      to: booking.inviteeEmail,
    },
    locals: {
      appointment: {
        durationInMilliseconds: meeting.duration * 60 * 1000,
        title: meeting.name,
        description: meeting.description ?? "Description",
        location: meeting.location,
        url: "www.kalle.app",
        organiser: {
          name: meeting.ownerName,
          email: meeting.owner.email,
        },
        owner: {
          name: booking.inviteeEmail.split("@")[0],
          email: booking.inviteeEmail,
        },
        partner: meeting.ownerName,
        start: {
          hour: booking.startDateUTC.getHours(),
          minute:
            booking.startDateUTC.getMinutes() === 0 ? "00" : booking.startDateUTC.getMinutes(),
          day: booking.startDateUTC.getDate(),
          month: startMonth.length === 2 ? startMonth : "0" + startMonth,
          year: booking.startDateUTC.getFullYear(),
        },
        duration: {
          hours: Math.floor(meeting.duration / 60),
          minutes: meeting.duration % 60,
        },
      },
    },
  })
}

export default async function cancelBookingMutation(bookingId: number, ctx: Ctx) {
  const booking = await db.booking.findFirst({
    where: { id: bookingId },
    include: {
      meeting: {
        include: {
          owner: true,
        },
      },
    },
  })

  if (!booking || booking.meeting.owner.id !== ctx.session.userId) {
    throw Error("Insufficient rights, appointment could not be cancelled")
  }

  await db.booking.delete({
    where: { id: bookingId },
  })

  await sendCancellationMail(booking, booking.meeting)
}
