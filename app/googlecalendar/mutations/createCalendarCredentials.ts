import db from "db"
import { Ctx } from "blitz"

interface GoogleCalenderCredentials {
  name: string
  status: "active"
  type: string
  credentials: {
    access_token: string
    refresh_token: string
  }
}

export default async function createCalendarCredentials(
  { name, status, type, credentials }: GoogleCalenderCredentials,
  ctx: Ctx
) {
  ctx.session.authorize()

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) throw new Error("Invariant failed: Owner does not exist.")

  await db.connectedCalendar.create({
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
}
