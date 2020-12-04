import db from "db"
import { Ctx } from "blitz"

export default async function getMeeting(link: string, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const meeting = await db.meeting.findFirst({
    where: { link: link },
  })

  return meeting
}
