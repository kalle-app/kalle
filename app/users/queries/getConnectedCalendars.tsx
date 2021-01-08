import db from "db"
import { Ctx } from "blitz"

export default async function getConnectedCalendars(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: ctx.session.userId },
    select: {
      caldavAddress: true,
      id: true,
      name: true,
      owner: true,
      ownerId: true,
      status: true,
      type: true,
      username: true,
      encryptedPassword: false,
    },
  })

  return calendars
}
