import db from "db"
import { Ctx } from "blitz"

interface MeetingLink {
  username: string
  slug: string
}

export default async function getMeeting(link: MeetingLink, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const meeting = await db.meeting.findFirst({
    where: {
      link: link.slug,
      ownerName: link.username,
    },
  })

  return meeting
}
