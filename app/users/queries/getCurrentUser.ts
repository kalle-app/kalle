import db from "db"
import { resolver } from "blitz"

export default resolver.pipe(resolver.authorize(), async (_ = null, ctx) => {
  return await db.user.findUnique({
    where: { id: ctx.session!.userId },
    select: { id: true, name: true, email: true, role: true },
  })
})
