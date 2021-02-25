import db from "db"
import { resolver } from "blitz"

export default resolver.pipe(resolver.authorize(), async (_ = null, ctx) => {
  return await db.connectedCalendar.findMany({
    where: { ownerId: ctx.session.userId },
    select: {
      caldavAddress: true,
      id: true,
      name: true,
      ownerId: true,
      status: true,
      type: true,
      username: true,
      encryptedPassword: false,
      refreshToken: true,
    },
  })
})
