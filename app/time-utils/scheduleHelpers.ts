import { dateWithPartialTime, Schedule } from "app/appointments/utils/scheduleToTakenSlots"
import { addDays, getDay, subDays } from "date-fns"

export function endOfLastWorkDayBefore(date: Date, schedule: Schedule, timezone: string): Date {
  while (true) {
    console.log("endOfLastWorkDayBefore")
    date = subDays(date, 1)
    console.log({ date, schedule, timezone })

    const weekday = getDay(date)

    if (schedule[weekday]) {
      const time = schedule[weekday]!.end

      return dateWithPartialTime(date, time, timezone)
    }
  }
}

export function startOfFirstWorkDayOnOrAfter(
  date: Date,
  schedule: Schedule,
  timezone: string
): Date {
  while (true) {
    console.log("startOfFirstWorkDayOnOrAfter")
    const weekday = getDay(date)
    console.log({ date, schedule, weekday, timezone })

    if (schedule[weekday]) {
      const time = schedule[weekday]!.start

      return dateWithPartialTime(date, time, timezone)
    }

    date = addDays(date, 1)
  }
}
