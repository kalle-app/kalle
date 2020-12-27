import { getTakenTimeSlots } from "app/caldav"
import passwordEncryptor from "app/users/password-encryptor"
import db from "db"
import { computeAvailableSlots } from "../utils/computeAvailableSlots"
import { scheduleToTakenSlots, Schedule, Days, partialTime } from "../utils/scheduleToTakenSlots"

interface GetTimeSlotsArgs {
  meetingSlug: string
  calendarOwner: string
}

const nineToFive = { start: partialTime(9, 0), end: partialTime(17, 0) }

const mockNineToFiveSchedule: Schedule = {
  [Days.monday]: nineToFive,
  [Days.tuesday]: nineToFive,
  [Days.wednesday]: nineToFive,
  [Days.thursday]: nineToFive,
  [Days.friday]: nineToFive,
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

  const schedule = mockNineToFiveSchedule // should be fetched from the database

  const password = await passwordEncryptor.decrypt(calendar.encryptedPassword)

  let takenTimeSlots = await getTakenTimeSlots(
    {
      url: calendar.caldavAddress,
      auth: { username: calendar.username, password, digest: true },
    },
    meeting.startDate,
    meeting.endDate
  )

  const between = {
    start: meeting.startDate,
    end: meeting.endDate,
  }

  return computeAvailableSlots({
    between,
    durationInMilliseconds: meeting.duration * 60 * 1000,
    takenSlots: [...takenTimeSlots, ...scheduleToTakenSlots(schedule, between)],
  })
}
