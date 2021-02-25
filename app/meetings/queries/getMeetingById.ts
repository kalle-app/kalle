import db from "db"
import { NotFoundError, resolver } from "blitz"
import * as z from "zod"

export default resolver.pipe(
  resolver.zod(z.number()),
  resolver.authorize(),
  async (meetingId, ctx) => {
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
)
