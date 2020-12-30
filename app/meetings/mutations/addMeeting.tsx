import db from "db"
import { Ctx } from "blitz"
import { Meeting } from "app/meetings/types"

export default async function addMeeting(meetingCreate: Meeting, ctx: Ctx) {
  ctx.session.authorize()

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) {
    throw new Error("Invariant failed: Owner does not exist.")
  }

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
      location: meetingCreate.location,
      owner: {
        connect: { username: owner.username },
      },
    },
  })

  return meeting
}
