import { getTakenTimeSlots } from "app/caldav"
import passwordEncryptor from "app/users/password-encryptor"
import db from "db"
import { computeAvailableSlots } from "../utils/computeAvailableSlots"

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

  const password = await passwordEncryptor.decrypt(calendar.encryptedPassword)

  let takenTimeSlots = await getTakenTimeSlots(
    {
      url: calendar.caldavAddress,
      auth: { username: calendar.username, password, digest: true },
    },
    meeting.startDate,
    meeting.endDate
  )

  return computeAvailableSlots(
    {
      start: meeting.startDate,
      end: meeting.endDate,
    },
    meeting.duration,
    takenTimeSlots
  )
}
