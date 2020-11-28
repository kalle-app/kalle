import { Ctx } from "blitz"

export default async function getMergedCalendar(_ = null, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const calendar = null

  return calendar
}
