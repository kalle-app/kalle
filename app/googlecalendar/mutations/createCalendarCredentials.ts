import db from "db"
import { GoogleCalenderCredentials } from "app/googlecalendar/validations"
import { Ctx } from "blitz"

export default async function createCalendarCredentials(
  { name, status, type, credentials }: GoogleCalenderCredentials,
  ctx: Ctx
) {
  console.log("GOT HERE")
  if (!ctx.session?.userId) return null

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) return null

  const createdCalendarCredentials = await db.connectedCalendar.create({
    data: {
      name: name,
      owner: {
        connect: { id: owner.id },
      },
      status: status,
      type: type,
      refreshToken: credentials.refresh_token,
    },
  })

  return createdCalendarCredentials
}
