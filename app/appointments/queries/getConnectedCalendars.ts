import db from "db"
import { Ctx } from "blitz"

export default async function getConnectedCalendars(userName: string, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const calendarOwner = await db.user.findFirst({
    where: { username: userName },
  })

  if (!calendarOwner) return null

  const calendars = await db.connectedCalendar.findMany({
    where: { ownerId: calendarOwner.id },
  })

  return calendars
}
