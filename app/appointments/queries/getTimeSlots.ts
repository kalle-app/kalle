import { ExternalEvent, getTakenTimeSlots } from "app/caldav"
import getFreeBusySchedule from "app/googlecalendar/queries/getFreeBusySchedule"
import passwordEncryptor from "app/users/password-encryptor"
import db, { ConnectedCalendar, DailySchedule, Meeting, User } from "db"
import { computeAvailableSlots } from "../utils/computeAvailableSlots"
import {
  Days,
  Schedule,
  scheduleToTakenSlots,
  timeStringToPartialTime,
} from "../utils/scheduleToTakenSlots"

interface GetTimeSlotsArgs {
  meetingSlug: string
  ownerName: string
}

export default async function getTimeSlots({ meetingSlug, ownerName }: GetTimeSlotsArgs) {
  const meeting = await db.meeting.findFirst({
    where: { link: meetingSlug, ownerName: ownerName },
    include: { schedule: { include: { dailySchedules: true } } },
  })
  if (!meeting) return null

  const meetingOwner = await db.user.findFirst({
    where: { username: ownerName },
  })

  if (!meetingOwner) return null

  const schedule = meeting.schedule.dailySchedules.reduce((res: Schedule, item: DailySchedule) => {
    res[Days[item.day]] = {
      start: timeStringToPartialTime(item.startTime),
      end: timeStringToPartialTime(item.endTime),
    }
    return res
  }, {})

  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: meetingOwner.id },
  })
  if (calendars.length === 0) return null

  let takenTimeSlots: ExternalEvent[] = []
  takenTimeSlots.push(...(await getCaldavTakenSlots(calendars, meeting)))
  takenTimeSlots.push(...(await getGoogleCalendarSlots(calendars, meeting, meetingOwner)))

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

async function getCaldavTakenSlots(calendars: ConnectedCalendar[], meeting: Meeting) {
  let slots: ExternalEvent[] = []
  const caldavCalendars = calendars.filter((calendar) => calendar.type == "caldav")
  for (const calendar of caldavCalendars) {
    const password = await passwordEncryptor.decrypt(calendar.encryptedPassword!)
    const newTakenSlots = await getTakenTimeSlots(
      {
        url: calendar.caldavAddress!,
        auth: { username: calendar.username!, password, digest: true },
      },
      meeting.startDate,
      meeting.endDate
    )
    slots.push(...newTakenSlots)
  }
  return slots
}

async function getGoogleCalendarSlots(
  calendars: ConnectedCalendar[],
  meeting: Meeting,
  meetingOwner: User
) {
  if (calendars.some((calendar) => calendar.type == "Google Calendar")) {
    const newTakenSlots = await getFreeBusySchedule({
      start: meeting.startDate,
      end: meeting.endDate,
      userId: meetingOwner.id,
    })
    if (newTakenSlots) {
      return newTakenSlots
    }
  }
  const empty: ExternalEvent[] = []
  return empty
}
