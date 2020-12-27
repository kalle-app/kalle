import db from "db"
import { Ctx } from "blitz"
import passwordEncryptor from "../password-encryptor"

interface CalendarCreate {
  name: string
  url: string
  type: string
  username: string
  password: string
}

export default async function addConnectedCalendar(calendarCreate: CalendarCreate, ctx: Ctx) {
  ctx.session.authorize()

  const owner = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  if (!owner) {
    throw new Error("Invariant error: Owner does not exist")
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
        connect: { id: owner.id },
      },
    },
  })

  return calendar
}
