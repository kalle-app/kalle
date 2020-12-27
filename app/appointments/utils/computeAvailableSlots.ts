import { ExternalEvent } from "app/caldav"
import { TimeSlot } from "../types"

function getTimePlusMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000)
}

function makeDateTime(time: string, date: Date): Date {
  const newDate = new Date(date)
  const timeSplit = time.split(":")
  newDate.setHours(Number(timeSplit[0]))
  newDate.setMinutes(Number(timeSplit[1]))
  return newDate
}

function noCollision(time: Date, event: TimeSlot, duration: number) {
  return getTimePlusMinutes(time, duration) <= event.start
}

interface DailySlot {
  date: Date
  free: Date[]
  events: ExternalEvent[]
}

const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

// Dummy data
const dailySchedule = [
  { day: "monday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "tuesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "wednesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "thursday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "friday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
]

function collides(a: TimeSlot, b: TimeSlot): boolean {
  if (a.start >= b.start) {
    return collides(b, a)
  }

  return a.end > b.start
}

interface ComputeAvailabilitySlotsArgs {
  between: TimeSlot
  durationInMilliseconds: number
  takenSlots: ExternalEvent[]
}

export function computeAvailableSlots({
  between,
  durationInMilliseconds,
  takenSlots,
}: ComputeAvailabilitySlotsArgs): TimeSlot[] {
  let cursor = between.start

  const result: TimeSlot[] = []

  const endOfSearch = new Date(+between.end - durationInMilliseconds)

  while (cursor < endOfSearch) {
    const potentialSlot: TimeSlot = {
      start: cursor,
      end: new Date(+cursor + durationInMilliseconds),
    }

    const collidingSlot = takenSlots.find((slot) => collides(slot, potentialSlot))

    if (!collidingSlot) {
      result.push(potentialSlot)
      cursor = potentialSlot.end
    } else {
      cursor = collidingSlot.end
    }
  }

  return result
}
