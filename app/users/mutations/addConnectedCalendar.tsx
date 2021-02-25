import db, { ConnectedCalendarType } from "db"
import { Ctx } from "blitz"
import passwordEncryptor from "../password-encryptor"
import { verifyConnectionDetails } from "app/caldav"

interface CalendarCreate {
  name: string
  url: string
  type: ConnectedCalendarType
  username: string
  password: string
}

export default async function addConnectedCalendar(calendarCreate: CalendarCreate, ctx: Ctx) {
  ctx.session.$authorize()

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) {
    throw new Error("Invariant error: Owner does not exist")
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
        connect: { id: owner.id },
      },
    },
  })

  return { fail: null }
}
