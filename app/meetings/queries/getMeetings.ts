import db from "db"
import { Ctx, resolver } from "blitz"
import * as z from "zod"

resolver.pipe(resolver.zod(z.number()), resolver.authorize(), async (meetingId, ctx) => {
  return await db.booking.findMany({
    where: {
      meetingId,
      meeting: {
        owner: {
          id: ctx.session.userId,
        },
      },
    },
  })
})

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
