import { ExternalEvent } from "app/caldav"
import { google } from "googleapis"
import GoogleClient from "../helpers/GoogleClient"
import updateCalendarCredentials from "../helpers/updateCalendarCredentials"

interface TimeSlotString {
  start: string
  end: string
}
interface DateTimeUnix {
  start: number
  end: number
}
interface GetFreeBusyScheduleArgs {
  start: Date
  end: Date
  userId: number
}

export default async function getFreeBusySchedule({ start, end, userId }: GetFreeBusyScheduleArgs) {
  await updateCalendarCredentials(userId)
  const auth = GoogleClient.Connection
  const calendar = google.calendar({ version: "v3", auth })
  const calendars = await calendar.calendarList.list({
    minAccessRole: "owner",
  })

  if (!calendars.data.items) return null
  const calendarIDs: string[] = calendars.data.items.map((calendar) => calendar.id!)

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
  arr.push({ start: 16754814600, end: 16754818200 })
  let old = arr[0]
  let temp: DateTimeUnix = { start: -1, end: -1 }
  for (let el of arr) {
    let curr = el
    if (curr == old) continue

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
