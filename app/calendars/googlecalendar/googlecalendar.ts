import { TimeSlotString, mergeArr, convertToExternalEvent ,convertToUnix } from "../utils"
import { google } from "googleapis"
import { createAuthenticatedGoogleOauth } from "./helpers/GoogleClient"
import { Appointment } from "../../appointments/types"
import { ConnectedCalendar } from "db"
import { CalendarService } from "app/calendar-service"
import { addMilliseconds } from "date-fns"

export async function createGcalEvent(appointment: Appointment, refreshToken: string) {
  const calendar = google.calendar({
    version: "v3",
    auth: createAuthenticatedGoogleOauth(refreshToken),
  })

  const startDate = appointment.start
  const endDate = addMilliseconds(appointment.start, appointment.durationInMilliseconds)

  await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: appointment.title,
      location: appointment.location || "",
      description: appointment.description,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: "Etc/UTC",
      },
      end: {
        dateTime: endDate.toISOString(),
      },
      attendees: [{ email: appointment.owner.email }, { email: appointment.organiser.email }],
      reminders: {
        useDefault: true,
      },
    },
  })
}



export async function getTakenTimeSlots(start: Date, end: Date, refreshToken: string) {
  const calendar = google.calendar({
    version: "v3",
    auth: createAuthenticatedGoogleOauth(refreshToken),
  })
  const {
    data: { items: calendars = [] },
  } = await calendar.calendarList.list({
    minAccessRole: "owner",
  })

  const calendarIDs = calendars.map((calendar) => calendar.id!)

  const body = {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    timeZone: "UTC",
    groupExpansionMax: 100,
    calendarExpansionMax: 100,
    items: calendarIDs.map((item) => ({ id: item })),
  }
  const freebusy = await calendar.freebusy.query({
    requestBody: body,
  })

  let rawFreeBusy: TimeSlotString[] = []
  for (let key in freebusy.data.calendars) {
    freebusy.data.calendars[key].busy?.forEach((el: TimeSlotString) => rawFreeBusy.push(el))
  }

  return convertToExternalEvent(mergeArr(convertToUnix(rawFreeBusy)))
}



export function getCalendarService(calendar: ConnectedCalendar): CalendarService {
  return {
    createEvent: (details) => createGcalEvent(details, calendar.refreshToken!),
    getTakenTimeSlots: (start, end) => getTakenTimeSlots(start, end, calendar.refreshToken!),
  }
}
