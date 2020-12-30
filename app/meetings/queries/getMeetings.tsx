import db from "db"
import { Ctx } from "blitz"

export default async function getMeetings(_ = null, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const user = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!user) return null

  const meetings = await db.meeting.findMany({
    where: { ownerName: user.username },
  })

  return meetings
}
