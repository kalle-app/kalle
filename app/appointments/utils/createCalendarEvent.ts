import * as ics from "ics"
import { Appointment } from "../types"

function durationToIcsDurationObject(duration: number): ics.DurationObject {
  const durationInMinutes = duration / (60 * 1000)
  return {
    hours: Math.floor(durationInMinutes / 60),
    minutes: durationInMinutes % 60,
  }
}

export function createCalendarEvent(appointment: Appointment): string {
  const { error, value } = ics.createEvent({
    start: [
      appointment.start.getFullYear(),
      appointment.start.getMonth() + 1,
      appointment.start.getDate(),
      appointment.start.getHours(),
      appointment.start.getMinutes(),
    ],
    duration: durationToIcsDurationObject(appointment.durationInMilliseconds),
    title: appointment.title,
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
