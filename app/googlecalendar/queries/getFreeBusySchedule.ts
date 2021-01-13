import updateCalendarCredentials from "../helpers/updateCalendarCredentials"
import GoogleClient from "../helpers/GoogleClient"
import { google } from "googleapis"

interface DateTimeString {
  start: string
  end: string
}
interface DateTime {
  start: Date
  end: Date
}
interface DateTimeUnix {
  start: number
  end: number
}
interface Props {
  start: Date
  end: Date
  userId: number
}

export default async function getFreeBusySchedule({ start, end, userId }: Props) {
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

  return calendar.freebusy
    .query({
      requestBody: body,
    })
    .then((res) => {
      var rawFreeBusy: DateTimeString[] = []
      console.log(res.data.calendars)
      for (var key in res.data.calendars) {
        res.data.calendars[key].busy?.forEach((el: DateTimeString) => rawFreeBusy.push(el))
      }
      const result: DateTimeUnix[] = mergeArr(convertToUnix(rawFreeBusy))

      return convertToTimeStamp(result)
    })
    .catch((_) => {
      "could not get freebusy"
    })
}

/**
 * Googlecalendar returns freebusy-slots of multiples calendars. These must be merged.
 * @returns the freebusy slots of all the combined calendars as one
 */
function mergeArr(arr: DateTimeUnix[]): DateTimeUnix[] {
  // Sort the array in descending order
  arr.sort(function (a, b) {
    return a.start - b.start
  })

  var mergedArr: DateTimeUnix[] = []
  arr.push({ start: 16754814600, end: 16754818200 })
  var old = arr[0]
  var temp: DateTimeUnix = { start: -1, end: -1 }
  for (var el of arr) {
    var curr = el
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

function convertToUnix(arr: DateTimeString[]): DateTimeUnix[] {
  return arr.map((el: DateTimeString) => {
    return {
      start: new Date(el.start).getTime() / 1000,
      end: new Date(el.end).getTime() / 1000,
    }
  })
}
function convertToTimeStamp(arr: DateTimeUnix[]): DateTime[] {
  return arr.map((el: DateTimeUnix) => {
    return {
      start: new Date(el.start * 1000),
      end: new Date(el.end * 1000),
    }
  })
}
