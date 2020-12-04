import { getTakenTimeSlots } from "app/caldav"
import db from "db"

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
    { url: calendar.caldavAddress, auth: { username: "blub", password: "", digest: false } },
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
    let time = dailySchedule[dayNames[day.date.getDay()]].startTime
    while(time + meeting.duration <= dailySchedule[dayNames[day.date.getDay()]].endTime) {
      if(noCollision(time, day.events[0], meeting.description)){
        day.free.push(time)
        time = time + meeting.duration
      }else{
        time = day.events[0].endTime
        const eventToRemove = day.events[0]
        day.events.filter((event) => event != eventToRemove)
      }
    }
  })

  // think about what to return, currently in calendar only start, end are returned
  return slots
}

function noCollision(time, event, duration) {
  return time + duration <= event.startTime
}

function datesAreOnSameDay(first, second) {
  return first.getFullYear() === second.getFullYear() &&
         first.getMonth() === second.getMonth() &&
         first.getDate() === second.getDate()
}