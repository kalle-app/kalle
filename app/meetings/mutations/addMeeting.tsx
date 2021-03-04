import db from "db"
import { resolver } from "blitz"
import { MeetingSchema } from "app/meetings/types"

export default resolver.pipe(
  resolver.zod(MeetingSchema),
  resolver.authorize(),
  async (meetingCreate, ctx) => {
    const owner = await db.user.findFirst({
      where: { id: ctx.session.userId },
    })

    if (!owner) {
      throw new Error("Invariant failed: Owner does not exist.")
    }

    const ownersCalendars = await db.connectedCalendar.findMany({
      where: { ownerId: owner.id },
    })

    if (
      !ownersCalendars.some((calendar) => calendar.id === meetingCreate.defaultConnectedCalendarId)
    ) {
      throw new Error("Calender where to add events to invalid")
    }

    const meeting = await db.meeting.create({
      data: {
        name: meetingCreate.name,
        link: meetingCreate.link,
        description: meetingCreate.description,
        duration: meetingCreate.duration,
        startDateUTC: meetingCreate.startDate,
        endDateUTC: meetingCreate.endDate,
        schedule: {
          connect: { id: meetingCreate.scheduleId },
        },
        location: meetingCreate.location,
        owner: {
          connect: { username: owner.username },
        },
        defaultConnectedCalendar: {
          connect: { id: meetingCreate.defaultConnectedCalendarId },
        },
      },
    })

    return meeting
  }
)
