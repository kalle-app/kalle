import db, { ConnectedCalendarType } from "db"
import { resolver } from "blitz"
import passwordEncryptor from "../password-encryptor"
import { verifyConnectionDetails } from "app/caldav"
import * as z from "zod"

export default resolver.pipe(
  resolver.zod(
    z.object({
      name: z.string(),
      url: z.string(),
      type: z.nativeEnum(ConnectedCalendarType),
      username: z.string(),
      password: z.string(),
    })
  ),
  resolver.authorize(),
  async (calendarCreate, ctx) => {
    const { fail } = await verifyConnectionDetails(
      calendarCreate.url,
      calendarCreate.username,
      calendarCreate.password
    )

    if (fail) {
      return { fail }
    }

    const encryptedPassword = await passwordEncryptor.encrypt(calendarCreate.password)

    await db.connectedCalendar.create({
      data: {
        name: calendarCreate.name,
        caldavAddress: calendarCreate.url,
        status: "active",
        type: calendarCreate.type,
        username: calendarCreate.username,
        encryptedPassword,
        owner: {
          connect: { id: ctx.session.userId },
        },
      },
    })

    return { fail: null }
  }
)
