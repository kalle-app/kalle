import db from "db"
import { Ctx } from "blitz"
import { createGoogleOauth } from "../helpers/GoogleClient"

interface GoogleCalenderCredentials {
  name: string
  status: "active"
  oauthCode: string
}

export default async function addGoogleCalendarCredentials(
  { name, status, oauthCode }: GoogleCalenderCredentials,
  ctx: Ctx
) {
  ctx.session.authorize()

  const oauth2Client = createGoogleOauth()
  const { tokens } = await oauth2Client.getToken(oauthCode)

  await db.connectedCalendar.create({
    data: {
      name: name,
      owner: {
        connect: { id: ctx.session.userId },
      },
      status: status,
      type: "GoogleCalendar",
      refreshToken: tokens.refresh_token,
    },
  })
}
