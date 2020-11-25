const ics = require("ics")

export function createCalendarEvent(appointment) {
  const object = {
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
    busyStatus: "BUSY",
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

  return ics.createEvent(object, (error, value) => {
    if (error) {
      console.error()
      return
    }
    return value
  })
}
