import db from "db"
import { Ctx } from "blitz"

export default async function getMeeting(link: string, ctx: Ctx) {
  ctx.session.authorize()

  const meeting = await db.meeting.findFirst({
    where: { link: link },
  })

  return meeting
}
