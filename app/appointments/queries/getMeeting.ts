import db from "db"
import { Ctx } from "blitz"

export default async function getMeeting(link: string, ctx: Ctx) {
  console.log("link!: ", link)
  if (!ctx.session?.userId) return null

  const meeting = await db.meeting.findFirst({
    where: { link: link },
  })

  return meeting
}
