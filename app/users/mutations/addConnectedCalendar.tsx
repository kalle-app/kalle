import db, { ConnectedCalendarType } from "db"
import { resolver } from "blitz"
import passwordEncryptor from "../password-encryptor"
import { verifyConnectionDetails } from "app/caldav"
import {getConnectionString} from "app/caldav/iCloudCalendar"
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
    console.log("is this icloud", calendarCreate)
    if (calendarCreate.type === "ICloud") {
      console.log("this is icloud")
      const x = await getConnectionString({
        url: calendarCreate.url,
        auth: {
          username: calendarCreate.username,
          password: calendarCreate.password,
          digest: false
        }
      })
      console.log(x)
    }
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
