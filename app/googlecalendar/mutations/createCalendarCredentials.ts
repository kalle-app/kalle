import db from "db"
import { resolver } from "blitz"
import { createGoogleOauth } from "../helpers/GoogleClient"
import * as z from "zod"

export default resolver.pipe(
  resolver.zod(
    z.object({
      name: z.string(),
      oauthCode: z.string(),
    })
  ),
  resolver.authorize(),
  async ({ name, oauthCode }, ctx) => {
    const oauth2Client = createGoogleOauth()
    const { tokens } = await oauth2Client.getToken(oauthCode)

    await db.connectedCalendar.create({
      data: {
        name: name,
        owner: {
          connect: { id: ctx.session.userId },
        },
        status: "active",
        type: "GoogleCalendar",
        refreshToken: tokens.refresh_token,
      },
    })
  }
)
