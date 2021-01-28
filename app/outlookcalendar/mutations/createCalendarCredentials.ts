import db from "db"
import { Ctx } from "blitz"

interface OutlookCredentials {
  name: string
  status: "active"
  type: string
  credentials: {
    account: object
    scopes: string[]
  }
}

export default async function createCalendarCredentials(
  { name, status, type, credentials }: OutlookCredentials,
  ctx: Ctx
) {
  if (!ctx.session?.userId) return null

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) return null

  return await db.connectedCalendar.create({
    data: {
      name: name,
      owner: {
        connect: { id: owner.id },
      },
      status: status,
      type: type,
      account: credentials.account,
      scopes: credentials.scopes,
    },
  })
}
