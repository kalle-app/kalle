import { google } from "googleapis"
import updateCalendarCredentials from "../helpers/updateCalendarCredentials"
import MicrosoftClient from "../helpers/MicrosoftClient"
import { Appointment } from "../../appointments/types"

interface Props {
  appointment: Appointment
  userId: number
}

export default async function createCalendarEvents({ appointment, userId }: Props) {
  await updateCalendarCredentials(userId)

  const auth = MicrosoftClient.Connection

  const calendar = google.calendar({ version: "v3", auth })

  let startDate: Date = new Date(appointment.start)

  var endDate: Date = new Date(appointment.start)
  endDate.setMilliseconds(appointment.durationInMilliseconds + startDate.getMilliseconds())

  var event = {
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

  calendar.events.insert(
    {
      auth: auth,
      calendarId: "primary",
      requestBody: event,
    },
    function (err) {
      if (err) {
        console.log("There was an error contacting the Calendar service: " + err)
        return
      }
    }
  )
}
