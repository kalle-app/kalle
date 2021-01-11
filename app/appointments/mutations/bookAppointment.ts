import { createEvent } from "app/caldav"
import { Ctx } from "blitz"
import db from "db"
import passwordEncryptor from "app/users/password-encryptor"
import moment from "moment"

interface BookingDetails {
  meetingId: number
  inviteeEmail: string
  date: Date
}

export default async function bookAppointmentMutation(bookingDetails: BookingDetails, ctx: Ctx) {
  ctx.session.authorize()

  const meeting = await db.meeting.findFirst({
    where: { id: bookingDetails.meetingId },
    include: {
      owner: {
        include: { calendars: true },
      },
    },
  })

  if (!meeting) {
    throw new Error("An error occured: Meeting does not exist.")
  }

  if (!meeting.owner) {
    throw new Error("An error occured: Meetingowner does not exist")
  }

  const calendar = meeting?.owner.calendars[0]
  if (!calendar) {
    throw new Error("An error occured: Calendar does not exist")
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

  const password = await passwordEncryptor.decrypt(calendar.encryptedPassword)

  createEvent(
    {
      url: calendar.caldavAddress,
      auth: { username: calendar.username, password, digest: true },
    },
    {
      name: meeting.name + "with" + bookingDetails.inviteeEmail,
      timezone: meeting.timezone,
      start: bookingDetails.date,
      end: moment(bookingDetails.date).add(meeting.duration, "m").toDate(),
      location: meeting.location,
      description: meeting.description,
    }
  )

  return booking
}
