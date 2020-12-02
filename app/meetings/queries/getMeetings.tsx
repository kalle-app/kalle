import db from "db"
import { Ctx } from "blitz"

export default async function getMeetings(_ = null, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const meetings = await db.meeting.findMany({
    where: { ownerId: ctx.session.userId },
  })

  return meetings
}
