import { ExternalEvent, getCalendarService } from "app/calendar/calendar-service"
import {
  endOfLastWorkDayBefore,
  startOfFirstWorkDayOnOrAfter,
} from "app/time-utils/scheduleHelpers"
import { Ctx, resolver } from "blitz"
import { getDay, setHours, setMinutes } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"
import db, { ConnectedCalendar, DailySchedule, Meeting } from "db"
import { computeAvailableSlots } from "../utils/computeAvailableSlots"
import {
  Days,
  Schedule,
  scheduleToTakenSlots,
  timeStringToPartialTime,
} from "../utils/scheduleToTakenSlots"
import * as z from "zod"

function applySchedule(date: Date, schedule: Schedule, type: "start" | "end", timezone: string) {
  const specificSchedule = schedule[getDay(date)]
  if (!specificSchedule) {
    if (type === "end") {
      return endOfLastWorkDayBefore(date, schedule, timezone)
    } else {
      return startOfFirstWorkDayOnOrAfter(date, schedule, timezone)
    }
  }

  let newDate = setHours(date, specificSchedule[type].hour)
  newDate = setMinutes(newDate, specificSchedule[type].minute)
  return newDate
}

async function getTakenSlots(
  calendars: ConnectedCalendar[],
  meeting: Meeting
): Promise<ExternalEvent[]> {
  const result = await Promise.all(
    calendars.map(async (calendar) => {
      const calendarService = await getCalendarService(calendar)
      return await calendarService.getTakenTimeSlots(meeting.startDateUTC, meeting.endDateUTC)
    })
  )
  const takenTimeSlots: ExternalEvent[] = []
  result.forEach((values) => {
    values.forEach((slots) => {
      takenTimeSlots.push(slots)
    })
  })
  return takenTimeSlots
}

export default resolver.pipe(
  resolver.zod(
    z.object({ meetingSlug: z.string(), ownerName: z.string(), hideInviteeSlots: z.boolean() })
  ),
  async ({ meetingSlug, ownerName, hideInviteeSlots }, ctx: Ctx) => {
    const meeting = await db.meeting.findFirst({
      where: { link: meetingSlug, ownerName: ownerName },
      include: { schedule: { include: { dailySchedules: true } } },
    })
    if (!meeting) return null

    const meetingOwner = await db.user.findFirst({
      where: { username: ownerName },
    })

    if (!meetingOwner) return null

    const schedule = meeting.schedule.dailySchedules.reduce(
      (res: Schedule, item: DailySchedule) => {
        res[Days[item.day]] = {
          start: timeStringToPartialTime(item.startTime),
          end: timeStringToPartialTime(item.endTime),
        }
        return res
      },
      {}
    )

    const calendars = await db.connectedCalendar.findMany({
      where: { ownerId: meetingOwner.id },
    })
    if (calendars.length === 0) return null

    let takenTimeSlots = await getTakenSlots(calendars, meeting)

    if (hideInviteeSlots) {
      ctx.session.$authorize()
      const invitee = await db.user.findFirst({
        where: { id: ctx.session.userId },
        include: { calendars: true },
      })
      if (!invitee) {
        throw new Error("Current user invalid. Try logging in again")
      }
      if (invitee.calendars) {
        takenTimeSlots.push(...(await getTakenSlots(invitee.calendars, meeting)))
      }
    }

    const between = {
      start: applySchedule(
        utcToZonedTime(meeting.startDateUTC, meeting.schedule.timezone),
        schedule,
        "start",
        meeting.schedule.timezone
      ),
      end: applySchedule(
        utcToZonedTime(meeting.endDateUTC, meeting.schedule.timezone),
        schedule,
        "end",
        meeting.schedule.timezone
      ),
    }

    return computeAvailableSlots({
      between,
      durationInMilliseconds: meeting.duration * 60 * 1000,
      takenSlots: [
        ...takenTimeSlots,
        ...scheduleToTakenSlots(schedule, between, meeting.schedule.timezone),
      ],
    })
  }
)
