import { Ctx } from "blitz"
import db from "db"
import { getCalendarService } from "app/calendar-service"

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

  const [primaryCalendar] = meeting.owner.calendars
  if (!primaryCalendar) {
    throw new Error("An error occured: Owner doesn't have a connected calendar")
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

  const calendarService = await getCalendarService(primaryCalendar)
  await calendarService.createEvent({
    start: bookingDetails.date,
    durationInMilliseconds: meeting.duration * 60 * 1000,
    title: `${meeting.name} with ${bookingDetails.inviteeEmail}`,
    description: meeting.description,
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
  })

  return booking
}
