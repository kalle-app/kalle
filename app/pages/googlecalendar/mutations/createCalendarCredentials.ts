import db from "db"
import { GoogleCalenderCredentials } from "app/googlecalendar/validations"
import { Ctx } from "blitz"

export default async function createCalendarCredentials({name, status, type, credentials}: GoogleCalenderCredentials, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })
  if (!owner) return null

  const createdCalendarCredentials = await db.calendarCredentials.create({
    data: {
      name: name,
      owner: {
        connect: { id: owner.id },
      },
      status: status,
      type: type,
      credentials: credentials
     }
    }
  )
  
  return createdCalendarCredentials
}
