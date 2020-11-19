import db from "db"
import { Ctx } from "blitz"

export default async function getCurrenAtUser(_ = null, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const user = await db.user.findOne({
    where: { id: ctx.session!.userId },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}
