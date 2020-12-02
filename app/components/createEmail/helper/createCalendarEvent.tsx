import * as ics from "ics"
import { EventAttributes } from "ics"
import { appointment } from "../types"

export function createCalendarEvent(appointment: appointment): string {
  const event: EventAttributes = {
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
  }
  let iCalEvent: string = ""
  ics.createEvent(event, (error, value) => {
    if (error) {
      console.log(error)
      return
    }
    iCalEvent = value
  })
  return iCalEvent
}
