import { dateWithPartialTime, Schedule } from "app/appointments/utils/scheduleToTakenSlots"
import { addDays, getDay, subDays } from "date-fns"

export function endOfLastWorkDayBefore(date: Date, schedule: Schedule, timezone: string): Date {
  while (true) {
    date = subDays(date, 1)

    const weekday = getDay(date)

    if (schedule[weekday]) {
      const time = schedule[weekday]!.end

      return dateWithPartialTime(date, time, timezone)
    }
  }
}

export function startOfFirstWorkDayAfter(date: Date, schedule: Schedule, timezone: string): Date {
  while (true) {
    const weekday = getDay(date)

    if (schedule[weekday]) {
      const time = schedule[weekday]!.start

      return dateWithPartialTime(date, time, timezone)
    }

    date = addDays(date, 1)
  }
}
