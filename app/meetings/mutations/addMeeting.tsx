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

  for (const day of Object.keys(meetingCreate.schedule)) {
    if (meetingCreate.schedule[day][0] && meetingCreate.schedule[day][1]) {
      await db.dailySchedule.create({
        data: {
          day: day,
          startTime: meetingCreate.schedule[day][0],
          endTime: meetingCreate.schedule[day][1],
          meeting: {
            connect: { id: meeting.id },
          },
        },
      })
    }
  }

  return meeting
}
