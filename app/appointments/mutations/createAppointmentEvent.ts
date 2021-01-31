import { createEvent } from "app/caldav"
import { Ctx } from "blitz"
import db from "db"
import passwordEncryptor from "app/users/password-encryptor"
import { addMinutes } from "date-fns"

interface BookingDetails {
  meetingId: number
  inviteeEmail: string
  date: Date
}

export default async function createAppointmentEventMutation(
  bookingDetails: BookingDetails,
  ctx: Ctx
) {
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

  if (!calendar.encryptedPassword || !calendar.caldavAddress || !calendar.username) {
    throw new Error("Some credentials for your calendar are missing.")
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

  const calDavResponse = await createEvent(
    {
      url: calendar.caldavAddress,
      auth: { username: calendar.username, password, digest: true },
    },
    {
      name: `${meeting.name} with ${bookingDetails.inviteeEmail}`,
      timezone: meeting.timezone,
      start: bookingDetails.date,
      end: addMinutes(bookingDetails.date, 30),
      location: meeting.location,
      description: meeting.description,
    }
  )

  if (calDavResponse !== "success") {
    throw new Error("An error occured: Event could not be added to calendar :(")
  }
  return booking
}
