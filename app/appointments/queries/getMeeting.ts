import db from "db"
import { resolver } from "blitz"
import * as z from "zod"

export default resolver.pipe(
  resolver.zod(z.object({ username: z.string(), slug: z.string() })),
  async ({ username, slug }) => {
    const meeting = await db.meeting.findFirst({
      where: {
        link: slug,
        ownerName: username,
      },
    })

    return meeting
  }
)
