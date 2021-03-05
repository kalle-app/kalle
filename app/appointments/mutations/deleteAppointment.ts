import { getEmailService } from "app/email"
import db, { Booking, Meeting, User } from "db"
import verifyCancelCode from "../queries/verifyCancelCode"

async function sendCancellationMail(booking: Booking, meeting: Meeting & { owner: User }) {
  const startMonth = (booking.startDateUTC.getMonth() + 1).toString()
  await getEmailService().send({
    template: "cancellation",
    message: {
      to: meeting.owner.email,
    },
    locals: {
      appointment: {
        durationInMilliseconds: meeting.duration * 60 * 1000,
        title: meeting.name,
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

export default async function deleteAppointmentMutation({ bookingId, cancelCode }) {
  const cancelCodeValid = await verifyCancelCode({ bookingId, cancelCode })
  if (!cancelCodeValid) {
    throw Error("Invalid Cancellationcode given")
  }

  const booking = await db.booking.delete({
    where: { id: bookingId },
  })

  const meeting = await db.meeting.findFirst({
    where: { id: booking.meetingId },
    include: { owner: true },
  })

  if (!meeting) {
    throw new Error("The meeting this booking belongs to does not exist")
  }

  await sendCancellationMail(booking, meeting)
}
