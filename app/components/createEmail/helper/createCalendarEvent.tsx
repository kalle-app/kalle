import * as ics from "ics"
import { Appointment } from "../types"

export function createCalendarEvent(appointment: Appointment): string {
  const { error, value } = ics.createEvent({
    start: [
      appointment.start.year,
      appointment.start.month,
      appointment.start.day,
      appointment.start.hour,
      appointment.start.minute,
    ],
    duration: { hours: appointment.duration.hours, minutes: appointment.duration.minutes },
    title: appointment.title,
    method: appointment.method,
    description: appointment.description,
    location: appointment.location,
    organizer: { name: appointment.organiser.name, email: appointment.organiser.email },
    attendees: [
      {
        name: appointment.owner.name,
        email: appointment.owner.email,
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
