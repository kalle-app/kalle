import { getTakenTimeSlots } from "app/caldav"
import db from "db"
import getSlotsAtSpecificDate from "./getSlotsAtSpecificDate"

interface GetTimeSlotsArgs {
  meetingSlug: string
  calendarOwner: string
}

export default async function getTimeSlots({ meetingSlug, calendarOwner }: GetTimeSlotsArgs) {
  const meeting = await db.meeting.findFirst({
    where: { link: meetingSlug, ownerId: Number(calendarOwner) },
  })
  if (!meeting) return null

  const calendar = await db.connectedCalendar.findFirst({
    where: { ownerId: meeting.ownerId },
  })
  if (!calendar) return null

  const start = new Date("2020-11-25T11:00:00.000Z")
  const end = new Date("2020-11-25T13:00:00.000Z")
  const start1 = new Date("2020-11-25T13:00:00.000Z")
  const end1 = new Date("2020-11-25T15:00:00.000Z")
  const start2 = new Date("2020-11-25T15:00:00.000Z")
  const end2 = new Date("2020-11-25T17:00:00.000Z")

  const startn = new Date("2020-11-26T11:00:00.000Z")
  const endn = new Date("2020-11-26T13:00:00.000Z")
  const start1n = new Date("2020-11-26T13:00:00.000Z")
  const end1n = new Date("2020-11-26T15:00:00.000Z")
  const start2n = new Date("2020-11-26T15:00:00.000Z")
  const end2n = new Date("2020-11-26T17:00:00.000Z")
  const slotsMock = [
    { start: start, end: end },
    { start: start1, end: end1 },
    { start: start2, end: end2 },
    { start: startn, end: endn },
    { start: start1n, end: end1n },
    { start: start2n, end: end2n },
  ]

  const takenTimeSlots = getTakenTimeSlots(
    { url: calendar.caldavAddress, auth: { username: "blub", password: "", digest: false } },
    meeting.startDate,
    meeting.endDate
  )

  //TODO get schedule from meeting
  const dailySchedule = [
    { day: "monday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
    { day: "tuesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
    { day: "wednesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
    { day: "thursday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
    { day: "friday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  ]

  const test = getSlotsAtSpecificDate(60, slotsMock, dailySchedule)
  console.log("test?????????????????????????")
}
