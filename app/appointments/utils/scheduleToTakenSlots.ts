import { TimeSlot } from "../types"
import {
  subDays,
  addDays,
  getDay,
  startOfMinute,
  setMinutes,
  setHours,
  subMilliseconds,
} from "date-fns"
import { getTimezoneOffset } from "date-fns-tz"

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

  function endOfLastWorkDayBefore(date: Date): Date {
    while (true) {
      date = subDays(date, 1)

      const weekday = getDay(date)

      if (schedule[weekday]) {
        const time = schedule[weekday]!.end

        return dateWithPartialTime(date, time, timezone)
      }
    }
  }

  function startOfFirstWorkDayAfter(date: Date): Date {
    while (true) {
      const weekday = getDay(date)

      if (schedule[weekday]) {
        const time = schedule[weekday]!.start

        return dateWithPartialTime(date, time, timezone)
      }

      date = addDays(date, 1)
    }
  }

  let cursor = between.start
  while (cursor < between.end) {
    const slot: TimeSlot = {
      start: endOfLastWorkDayBefore(cursor),
      end: startOfFirstWorkDayAfter(cursor),
    }

    result.push(slot)

    cursor = addDays(slot.end, 1)
  }

  return result
}
