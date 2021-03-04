import db from "db"
import { getCalendarService } from "app/calendar/calendar-service"
import getConnectedCalendar from "../queries/getConnectedCalendar"
import * as uuid from "uuid"

interface BookingDetails {
  meetingId: number
  inviteeEmail: string
  date: Date
}

export default async function createAppointmentEventMutation(bookingDetails: BookingDetails) {
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
  const primaryCalendar = await getConnectedCalendar(meeting.defaultConnectedCalendarId)
  if (!primaryCalendar) {
    throw new Error("An error occured: Owner doesn't have a connected calendar")
  }

  const cancelCode = uuid.v4()

  // todo save hashed cancelcode
  const booking = await db.booking.create({
    data: {
      meeting: {
        connect: { id: bookingDetails.meetingId },
      },
      inviteeEmail: bookingDetails.inviteeEmail,
      startDateUTC: bookingDetails.date,
      cancelCode: cancelCode,
    },
  })

  const calendarService = await getCalendarService(primaryCalendar)
  await calendarService.createEvent({
    ...booking,
    meeting,
  })

  return booking
}
