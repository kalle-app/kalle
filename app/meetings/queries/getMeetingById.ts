import db from "db"
import { Ctx, NotFoundError } from "blitz"

export default async function getMeetingById(meetingId: number, ctx: Ctx) {
  ctx.session.$authorize()

  const meeting = await db.meeting.findFirst({
    where: {
      id: meetingId,
      owner: {
        id: ctx.session.userId,
      },
    },
  })

  if (!meeting) {
    throw new NotFoundError()
  }

  return meeting
}
