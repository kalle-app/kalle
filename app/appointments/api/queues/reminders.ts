import { getEmailService } from "app/email"
import { Queue } from "quirrel/blitz"
import db, { Booking } from "db"

function asTwoDigit(n: number): string {
  const s = n.toString()
  if (s.length === 1) {
    return "0" + s
  }

  return s
}

export default Queue("api/queues/reminders", async (bookingId: Booking["id"]) => {
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { meeting: { include: { owner: true } } },
  })
  if (!booking) {
    return
  }

  await getEmailService().send({
    template: "notification",
    message: {
      to: booking.meeting.owner.email,
    },
    locals: {
      appointment: {
        title: booking.meeting.name,
        organiser: {
          name: booking.meeting.ownerName,
        },
        location: booking.meeting.location,
        description: booking.meeting.description,
        start: {
          hour: booking.startDateUTC.getHours(),
          minute: asTwoDigit(booking.startDateUTC.getMinutes()),
          day: booking.startDateUTC.getDate(),
          month: booking.startDateUTC.getMonth() + 1,
          year: booking.startDateUTC.getFullYear(),
        },
        duration: {
          hours: Math.floor(booking.meeting.duration / 60),
          minutes: booking.meeting.duration % 60,
        },
      },
    },
  })
})
