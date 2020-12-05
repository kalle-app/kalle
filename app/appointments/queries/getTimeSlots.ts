import { getTakenTimeSlots } from "app/caldav"
import db from "db"
import { date } from "zod";

interface GetTimeSlotsArgs {
  meetingSlug: string
  calendarOwner: string
}

interface DailySlot {
  date: Date,
  free: any[],
  events: any[],
}

const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Dummy data
const dailySchedule = [
  { day: "monday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "tuesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "wednesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "thursday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "friday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
]

export default async function getTimeSlots({ meetingSlug, calendarOwner }: GetTimeSlotsArgs) {
  const meeting = await db.meeting.findFirst({
    where: { link: meetingSlug, ownerId: Number(calendarOwner) },
  })
  if (!meeting) return null

  const calendar = await db.connectedCalendar.findFirst({
    where: { ownerId: meeting.ownerId },
  })
  if (!calendar) return null

  let takenTimeSlots = await getTakenTimeSlots(
    { url: calendar.caldavAddress, auth: { username: calendar.username, password: calendar.password, digest: true } },
    meeting.startDate,
    meeting.endDate
  )

  takenTimeSlots = takenTimeSlots.sort((a, b) => (a.start.getTime() - b.start.getTime()))

  // Build Array of DailySlots for every Day inbetween our dates
  const slots: DailySlot[] = []
  for(let dt = new Date(meeting.startDate); dt <= meeting.endDate; dt.setDate(dt.getDate()+1)){
    slots.push({
      date: new Date(dt),
      free: [],
      events: []
    })
  }

  // Map all externalEvents to the according day in slots
  slots.forEach((day: DailySlot) => {
    if(takenTimeSlots.length == 0) return

    while(datesAreOnSameDay(takenTimeSlots[0].start, day.date)) {
      day.events.push(takenTimeSlots[0])
    }
  })

  // Create free slots for every day
  // For every day we start with the schedule startTime and then try to greedy find the next possible appointment
  // As soon, as we cannot fit an appointment anymore there seems to be a blocking event, so we start to
  // Greedy find the next fitting slot after that event 
  slots.forEach((day: DailySlot) => {
    const weekdaySchedule = dailySchedule.find((schedule) => schedule.day == dayNames[day.date.getDay()])
    if(weekdaySchedule) {
      let time = makeDateTime(weekdaySchedule.startTime, day.date)
      let endTime = makeDateTime(weekdaySchedule.endTime, day.date)
      while(new Date(time.getTime() + meeting.duration * 60000) <= endTime) {
        if(day.events.length == 0 || noCollision(time, day.events[0], meeting.description)){
          day.free.push(time)
          time = new Date(time.getTime() + meeting.duration * 60000)
        }else{
          time = makeDateTime(day.events[0].endTime, day.date)
          const eventToRemove = day.events[0]
          day.events.filter((event) => event != eventToRemove)
        }
      }
    }
  })

  console.log(slots)

  // think about what to return, currently in calendar only start, end are returned
  return slots
}

function makeDateTime(time: string, date: Date) : Date{
  const newDate = new Date(date)
  const timeSplit = time.split(':')
  newDate.setHours(Number(timeSplit[0]))
  newDate.setMinutes(Number(timeSplit[1]))
  return newDate
}

function noCollision(time, event, duration) {
  return time + duration <= event.startTime
}

function datesAreOnSameDay(first, second) {
  return first.getFullYear() === second.getFullYear() &&
         first.getMonth() === second.getMonth() &&
         first.getDate() === second.getDate()
}