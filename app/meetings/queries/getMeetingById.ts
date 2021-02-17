import db from "db"
import { Ctx } from "blitz"

export default async function getMeetingById(meetingId: number, ctx: Ctx) {
  console.log("meetingid: ", meetingId, " ctx: ", ctx)

  const meeting = await db.meeting.findFirst({
    where: {
      id: meetingId,
    },
  })

  return meeting
}
