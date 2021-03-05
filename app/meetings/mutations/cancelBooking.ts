import { Ctx } from "blitz"
import db from "db"

export default async function cancelBookingMutation(bookingId: number, ctx: Ctx) {
  const booking = await db.booking.findFirst({
    where: { id: bookingId },
    include: {
      meeting: {
        include: {
          owner: true,
        },
      },
    },
  })

  if (!booking || booking.meeting.owner.id !== ctx.session.userId) {
    throw Error("Insufficient rights, appointment could not be cancelled")
  }

  await db.booking.delete({
    where: { id: bookingId },
  })

  // send confirmation mail
  return
}
