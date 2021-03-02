import { ExternalEvent } from "app/calendar/caldav"
import { google } from "googleapis"
import { createAuthenticatedGoogleOauth } from "./helpers/GoogleClient"
import { ConnectedCalendar } from "db"
import { CalendarService, CreateEventBooking } from "app/calendar/calendar-service"
import { addSeconds } from "date-fns"

export async function createGcalEvent(booking: CreateEventBooking, refreshToken: string) {
  const calendar = google.calendar({
    version: "v3",
    auth: createAuthenticatedGoogleOauth(refreshToken),
  })

  const startDate = booking.startDateUTC
  const endDate = addSeconds(booking.startDateUTC, booking.meeting.duration)

  await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: booking.meeting.name,
      location: booking.meeting.location ?? "",
      description: booking.meeting.description,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: "Etc/UTC",
      },
      end: {
        dateTime: endDate.toISOString(),
      },
      attendees: [{ email: booking.meeting.owner.email }, { email: booking.inviteeEmail }],
      reminders: {
        useDefault: true,
      },
    },
  })
}

interface TimeSlotString {
  start: string
  end: string
}

interface DateTimeUnix {
  start: number
  end: number
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

/**
 * Googlecalendar returns freebusy-slots of multiples calendars. These must be merged.
 * @returns the freebusy slots of all the combined calendars as one
 */
export function mergeArr(arr: DateTimeUnix[]): DateTimeUnix[] {
  // Sort the array in descending order
  arr.sort(function (a, b) {
    return a.start - b.start
  })

  let mergedArr: DateTimeUnix[] = []

  // timestamps of the year 2500 to make the algorithm work, see docs for deeper explanation
  arr.push({ start: 16754814600, end: 16754818200 })
  let old = arr[0]
  let temp: DateTimeUnix = { start: -1, end: -1 }
  for (let el of arr) {
    let curr = el
    if (curr === old) continue

    if (curr.start <= old.end) {
      if (temp.start === -1) {
        temp.start = old!.start
      }
      curr.start = old.start
    } else {
      if (temp.start === -1) {
        temp.start = old.start!
        temp.end = old.end!
      } else {
        temp.end = old.end!
      }
      mergedArr.push(temp)
      temp = { start: -1, end: -1 }
    }

    old = el
  }
  return mergedArr.sort(function (a, b) {
    return a.start - b.start
  })
}

export function convertToUnix(arr: TimeSlotString[]): DateTimeUnix[] {
  return arr.map((el: TimeSlotString) => {
    return {
      start: new Date(el.start).getTime() / 1000,
      end: new Date(el.end).getTime() / 1000,
    }
  })
}

function convertToExternalEvent(arr: DateTimeUnix[]): ExternalEvent[] {
  return arr.map((el: DateTimeUnix) => {
    return {
      start: new Date(el.start * 1000),
      end: new Date(el.end * 1000),
    }
  })
}

export function getCalendarService(calendar: ConnectedCalendar): CalendarService {
  return {
    createEvent: (details) => createGcalEvent(details, calendar.refreshToken!),
    getTakenTimeSlots: (start, end) => getTakenTimeSlots(start, end, calendar.refreshToken!),
  }
}
