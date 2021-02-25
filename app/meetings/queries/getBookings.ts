import db from "db"
import { resolver } from "blitz"
import * as z from "zod"

export default resolver.pipe(
  resolver.zod(z.number()),
  resolver.authorize(),
  async (meetingId, ctx) => {
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
  }
)
