import { createCalDavEvent } from "app/caldav"
import { Ctx, invoke } from "blitz"
import db from "db"
import passwordEncryptor from "app/users/password-encryptor"
import { addMinutes } from "date-fns"
import createGcalEvent from "../../googlecalendar/queries/createGcalEvent"

interface BookingDetails {
  meetingId: number
  inviteeEmail: string
  date: Date
}

export default async function createAppointmentEventMutation(
  bookingDetails: BookingDetails,
  ctx: Ctx
) {
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
  if (calendar.type === "Google Calendar") {
    const appointment = {
      start: bookingDetails.date,
      durationInMilliseconds: meeting.duration * 60 * 1000,
      title: `${meeting.name} with ${bookingDetails.inviteeEmail}`,
      description: meeting.description,
      method: "request",
      location: meeting.location,
      url: "www.kalle.app",
      organiser: {
        name: meeting.ownerName,
        email: "info@kalle.app",
      },
      owner: {
        name: bookingDetails.inviteeEmail.split("@")[0],
        email: bookingDetails.inviteeEmail,
      },
    }

    await invoke(createGcalEvent, {
      appointment: appointment,
      userId: 1,
    })

    return booking
  }

  if (!calendar.encryptedPassword || !calendar.caldavAddress || !calendar.username) {
    throw new Error("Some credentials for your calendar are missing.")
  }

  const password = await passwordEncryptor.decrypt(calendar.encryptedPassword)
  const calDavResponse = await createCalDavEvent(
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
