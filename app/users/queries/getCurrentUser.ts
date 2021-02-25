import db from "db"
import { Ctx } from "blitz"

export default async function getCurrentUser(_ = null, ctx: Ctx) {
  ctx.session.$authorize()

  const user = await db.user.findUnique({
    where: { id: ctx.session!.userId },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}
