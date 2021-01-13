import db from "db"
import { GoogleCalenderCredentials } from "app/googlecalendar/validations"
import { Ctx } from "blitz"

export default async function updateCredentials(input: GoogleCalenderCredentials, ctx: Ctx) {
  const user = ctx.session?.userId
  if (!user) return null

  db.connectedCalendar.update({
    data: {
      refreshToken: input.credentials.refresh_token,
    },
    where: {
      id: user,
    },
  })
  return user
}
