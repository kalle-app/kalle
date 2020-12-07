import db from "db"
import { Ctx } from "blitz"
import { Meeting } from "app/meetings/types"

export default async function addMeeting(meetingCreate: Meeting, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) return null

  const meeting = await db.meeting.create({
    data: {
      name: meetingCreate.name,
      link: meetingCreate.link,
      description: meetingCreate.description,
      duration: meetingCreate.duration,
      timezone: meetingCreate.timezone,
      startDate: meetingCreate.startDate,
      endDate: meetingCreate.endDate,
      owner: {
        connect: { id: owner.id },
      },
    },
  })

  for (const [day, [startTime, endTime]] of Object.entries(meetingCreate.schedule)) {
    if (startTime && endTime) {
      await db.dailySchedule.create({
        data: {
          day: day,
          startTime,
          endTime,
          meeting: {
            connect: { id: meeting.id },
          },
        },
      })
    }
  }

  return meeting
}
