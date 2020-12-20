import db from "db"
import { Ctx } from "blitz"
import { Meeting } from "app/meetings/types"

export default async function addMeeting(meetingCreate: Meeting, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) return null

  console.log(meetingCreate)

  const meeting = await db.meeting.create({
    data: {
      name: meetingCreate.name,
      link: meetingCreate.link,
      description: meetingCreate.description,
      duration: meetingCreate.duration,
      timezone: meetingCreate.timezone,
      startDate: meetingCreate.startDate,
      endDate: meetingCreate.endDate,
      schedule: {
        connect: { id: meetingCreate.scheduleId },
      },
      owner: {
        connect: { id: owner.id },
      },
    },
  })

  return meeting
}
