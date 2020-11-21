import db from "db"
import { Ctx } from "blitz"

type CalendarCreate = {
  name: string
  url: string
  type: string
}

export default async function addConnectedCalendar(calendarCreate: CalendarCreate, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) return null

  const calendar = await db.connectedCalendar.create({
    data: {
      name: calendarCreate.name,
      caldavAddress: calendarCreate.url,
      status: "active",
      type: calendarCreate.type,
      owner: {
        connect: { id: owner.id },
      },
    },
  })

  return calendar
}
