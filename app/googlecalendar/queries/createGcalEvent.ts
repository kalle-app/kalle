import { google } from "googleapis"
import updateCalendarCredentials from "../helpers/updateCalendarCredentials"
import GoogleClient from "../helpers/GoogleClient"
import { Appointment } from "../../appointments/types"

interface CreateCalendarArguments {
  appointment: Appointment
  userId: number
}

export default async function createGcalEvent({ appointment, userId }: CreateCalendarArguments) {
  await updateCalendarCredentials(userId)

  const auth = GoogleClient.Connection

  const calendar = google.calendar({ version: "v3", auth })

  let startDate = new Date(appointment.start)

  let endDate = new Date(appointment.start)
  endDate.setMilliseconds(appointment.durationInMilliseconds + startDate.getMilliseconds())

  let event = {
    summary: appointment.title,
    location: appointment.location || "",
    description: appointment.description,
    start: {
      dateTime: appointment.start.toISOString(),
      timeZone: "Etc/UTC",
    },
    end: {
      dateTime: endDate.toISOString(),
    },
    attendees: [{ email: appointment.owner.email }, { email: appointment.organiser.email }],
    reminders: {
      useDefault: true,
    },
  }

  await calendar.events.insert(
    {
      auth: auth,
      calendarId: "primary",
      requestBody: event,
    },
    function (err) {
      if (err) return "failure"
      return "success"
    }
  )
}
