import { TimeSlot } from "../types"
import { addDays, startOfMinute, setMinutes, setHours, subMilliseconds } from "date-fns"
import { getTimezoneOffset } from "date-fns-tz"
import { endOfLastWorkDayBefore, startOfFirstWorkDayOnOrAfter } from "app/time-utils/scheduleHelpers"

export enum Days {
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
}

interface PartialTime {
  hour: number
  minute: number
}

export function partialTime(hour: number, minute: number): PartialTime {
  return { hour, minute }
}

export function timeStringToPartialTime(timeString: string): PartialTime {
  const timeSplit = timeString.split(":")
  return partialTime(Number(timeSplit[0]), Number(timeSplit[1]))
}

export type Schedule = Partial<Record<Days, { start: PartialTime; end: PartialTime }>>

export function dateWithPartialTime(date: Date, time: PartialTime, timezone: string) {
  const baseDate = startOfMinute(setHours(setMinutes(date, time.minute), time.hour))
  const offsetInducedByDateParam = date.getTimezoneOffset() * 60 * 1000
  const offsetInducedByTimezone = getTimezoneOffset(timezone, date)
  return subMilliseconds(baseDate, offsetInducedByDateParam + offsetInducedByTimezone)
}

export function scheduleToTakenSlots(
  schedule: Schedule,
  between: TimeSlot,
  timezone: string
): TimeSlot[] {
  if (Object.keys(schedule).length === 0) {
    return [between]
  }

  const result: TimeSlot[] = []
  let cursor = between.start

  //we need to include the blocked slot between the end of the last day (between.end) and beginning of the next day (addDays(between.end, 1))
  while (cursor <= addDays(between.end, 1)) {
    const slot: TimeSlot = {
      start: endOfLastWorkDayBefore(cursor, schedule, timezone),
      end: startOfFirstWorkDayOnOrAfter(cursor, schedule, timezone),
    }
    result.push(slot)
    cursor = addDays(slot.end, 1)
  }
  return result
}
