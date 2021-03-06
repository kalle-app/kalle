import db, { ConnectedCalendarType } from "db"
import { resolver } from "blitz"
import passwordEncryptor from "../password-encryptor"
import { verifyConnectionDetails } from "app/calendar/caldav"
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

    const calendar = await db.connectedCalendar.create({
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

    const defaultCalendar = await db.defaultCalendar.findFirst({
      where: { userId: ctx.session.userId },
    })

    if (!defaultCalendar) {
      await db.defaultCalendar.create({
        data: {
          user: {
            connect: { id: ctx.session.userId },
          },
          calendar: {
            connect: { id: calendar.id },
          },
        },
      })
    }

    return { fail: null }
  }
)
