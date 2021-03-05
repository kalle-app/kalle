import { Booking, Meeting, User } from "db"
import * as ics from "ics"

function durationToIcsDurationObject(durationInMinutes: number): ics.DurationObject {
  return {
    hours: Math.floor(durationInMinutes / 60),
    minutes: durationInMinutes % 60,
  }
}

export function createICalendarEvent(booking: Booking, meeting: Meeting & { owner: User }): string {
  const { error, value } = ics.createEvent({
    start: [
      booking.startDateUTC.getFullYear(),
      booking.startDateUTC.getMonth() + 1,
      booking.startDateUTC.getDate(),
      booking.startDateUTC.getHours(),
      booking.startDateUTC.getMinutes(),
    ],
    duration: durationToIcsDurationObject(meeting.duration),
    title: meeting.name,
    description: meeting.description,
    location: meeting.location,
    organizer: { name: meeting.owner.name, email: meeting.owner.email },
    attendees: [
      {
        name: meeting.owner.name,
        email: meeting.owner.email,
        rsvp: true,
        partstat: "ACCEPTED",
        role: "REQ-PARTICIPANT",
      },
    ],
  })

  if (error) {
    throw error
  }

  return value!
}
