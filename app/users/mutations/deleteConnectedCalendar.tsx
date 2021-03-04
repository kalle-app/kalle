import db from "db"
import { resolver } from "blitz"
import * as z from "zod"

export default resolver.pipe(
  resolver.zod(z.number()),
  resolver.authorize(),
  async (calendarId, ctx) => {
    const result = await db.connectedCalendar.deleteMany({
      where: { id: calendarId, ownerId: ctx.session.userId },
    })

    return result.count === 1 ? "success" : "error"
  }
)
