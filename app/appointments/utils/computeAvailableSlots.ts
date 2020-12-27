import { ExternalEvent } from "app/caldav"
import { areDatesOnSameDay } from "app/time-utils/comparison"
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
  const durationInMinutes = durationInMilliseconds / 1000 / 60
  const duration = durationInMinutes

  takenSlots = takenSlots.sort((a, b) => a.start.getTime() - b.start.getTime())

  // Build Array of DailySlots for every Day inbetween our dates
  const slots: DailySlot[] = []
  for (let dt = new Date(between.start); dt <= between.start; dt.setDate(dt.getDate() + 1)) {
    slots.push({
      date: new Date(dt),
      free: [],
      events: [],
    })
  }

  // Map all externalEvents to the according day in slots
  slots.forEach((day: DailySlot) => {
    while (takenSlots.length !== 0 && areDatesOnSameDay(takenSlots[0].start, day.date)) {
      day.events.push(takenSlots[0])
      takenSlots.shift()
    }
  })

  // Create free slots for every day
  // For every day we start with the schedule startTime and then try to greedy find the next possible appointment
  // As soon, as we cannot fit an appointment anymore there seems to be a blocking event, so we start to
  // Greedy find the next fitting slot after that event
  slots.forEach((day: DailySlot) => {
    const weekdaySchedule = dailySchedule.find(
      (schedule) => schedule.day === dayNames[day.date.getDay()]
    )
    if (weekdaySchedule) {
      let time = makeDateTime(weekdaySchedule.startTime, day.date)
      let endTime = makeDateTime(weekdaySchedule.endTime, day.date)
      while (getTimePlusMinutes(time, duration) <= endTime) {
        if (day.events.length === 0 || noCollision(time, day.events[0], duration)) {
          day.free.push(time)
          time = getTimePlusMinutes(time, duration)
        } else {
          // Currently default 0 minutes to next meeting, could be customized
          time = getTimePlusMinutes(day.events[0].end, 0)
          const eventToRemove = day.events[0]
          day.events = day.events.filter((event) => event !== eventToRemove)
        }
      }
    }
  })

  const freeSlots = slots.map((slot) =>
    slot.free.map((item) => {
      return { start: getTimePlusMinutes(item, 0), end: getTimePlusMinutes(item, duration) }
    })
  )
  const freeSlotsFlat = freeSlots.flat()

  return freeSlotsFlat
}
