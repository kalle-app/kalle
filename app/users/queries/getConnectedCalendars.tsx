import db from "db"
import { Ctx } from "blitz"

export default async function getConnectedCalendars(_ = null, ctx: Ctx) {
  ctx.session.$authorize()

  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: ctx.session.userId },
    select: {
      caldavAddress: true,
      id: true,
      name: true,
      ownerId: true,
      status: true,
      type: true,
      username: true,
      encryptedPassword: false,
      refreshToken: true,
    },
  })

  return calendars
}
