import db from "db"
import { Ctx } from "blitz"

export default async function getMeetings(_ = null, ctx: Ctx) {
  ctx.session.$authorize()

  const user = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!user) {
    throw new Error("couldn't find user")
  }

  const meetings = await db.meeting.findMany({
    where: { ownerName: user.username },
  })

  return meetings
}
