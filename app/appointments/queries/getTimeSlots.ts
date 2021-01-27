import { getTakenTimeSlots } from "app/caldav"
import passwordEncryptor from "app/users/password-encryptor"
import { Ctx } from "blitz"
import db, { DailySchedule } from "db"
import { computeAvailableSlots } from "../utils/computeAvailableSlots"
import {
  scheduleToTakenSlots,
  Schedule,
  Days,
  timeStringToPartialTime,
} from "../utils/scheduleToTakenSlots"

interface GetTimeSlotsArgs {
  meetingSlug: string
  ownerName: string
  hideInviteeSlots: boolean
}

export default async function getTimeSlots(
  { meetingSlug, ownerName, hideInviteeSlots }: GetTimeSlotsArgs,
  ctx: Ctx
) {
  const meeting = await db.meeting.findFirst({
    where: { link: meetingSlug, ownerName: ownerName },
    include: { schedule: { include: { dailySchedules: true } } },
  })
  if (!meeting) return null

  const meetingOwner = await db.user.findFirst({
    where: { username: ownerName },
  })

  if (!meetingOwner) return null

  const calendar = await db.connectedCalendar.findFirst({
    where: { ownerId: meetingOwner.id },
  })
  if (!calendar) return null

  const schedule = meeting.schedule.dailySchedules.reduce((res: Schedule, item: DailySchedule) => {
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

  if (hideInviteeSlots) {
    ctx.session.authorize()
    const inviteeCalendars = await db.connectedCalendar.findMany({
      where: { ownerId: ctx.session.userId },
    })
    // Get all googleCal and caldav events merged, merge them to takenSlots
    if (!inviteeCalendars) return null
  }

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
