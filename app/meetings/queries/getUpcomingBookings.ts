import db from "db"
import { Ctx } from "blitz"

export default async function getBookings(span: number, ctx: Ctx) {
  ctx.session.authorize()

  const bookings = await db.booking.findMany({
    where: {
      meeting: {
        owner: {
          id: {
            equals: ctx.session.userId,
          },
        },
      },
      date: {
        gt: new Date(),
      },
    },
    include: {
      meeting: true,
    },
    orderBy: {
      date: "asc",
    },
    take: span,
  })

  return bookings
}
