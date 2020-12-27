import { getTakenTimeSlots } from "app/caldav"
import passwordEncryptor from "app/users/password-encryptor"
import db, { DailySchedule } from "db"
import { computeAvailableSlots } from "../utils/computeAvailableSlots"
import {
  scheduleToTakenSlots,
  Schedule,
  Days,
  partialTime,
  timeStringToPartialTime,
} from "../utils/scheduleToTakenSlots"

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
    include: { schedule: true },
  })
  if (!meeting) return null

  const calendar = await db.connectedCalendar.findFirst({
    where: { ownerId: meeting.ownerId },
  })
  if (!calendar) return null

  const schedule = meeting.schedule.reduce((res: Schedule, item: DailySchedule) => {
    res[Days[item.day]] = {
      start: timeStringToPartialTime(item.startTime),
      end: timeStringToPartialTime(item.endTime),
    }
    return res
  }, {})

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
