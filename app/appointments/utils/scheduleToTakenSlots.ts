import { TimeSlot } from "../types"
import { subDays, addDays, getDay, startOfMinute, setMinutes, setHours, subMinutes } from "date-fns"

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

function dateWithPartialTime(date: Date, time: PartialTime) {
  return subMinutes(
    startOfMinute(setHours(setMinutes(date, time.minute), time.hour)),
    date.getTimezoneOffset()
  )
}

export function scheduleToTakenSlots(schedule: Schedule, between: TimeSlot): TimeSlot[] {
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

        return dateWithPartialTime(date, time)
      }
    }
  }

  function startOfFirstWorkDayAfter(date: Date): Date {
    while (true) {
      const weekday = getDay(date)

      if (schedule[weekday]) {
        const time = schedule[weekday]!.start

        return dateWithPartialTime(date, time)
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
