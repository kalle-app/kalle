import db from "db"
import { resolver } from "blitz"
import * as z from "zod"

export default resolver.pipe(resolver.zod(z.number()), resolver.authorize(), async (take, ctx) => {
  return await db.booking.findMany({
    where: {
      meeting: {
        owner: {
          id: {
            equals: ctx.session.userId,
          },
        },
      },
      startDateUTC: {
        gt: new Date(),
      },
    },
    include: {
      meeting: true,
    },
    orderBy: {
      startDateUTC: "asc",
    },
    take,
  })
})
