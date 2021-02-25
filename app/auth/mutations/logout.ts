import { Ctx } from "blitz"

export default async function logout(_ = null, ctx: Ctx) {
  return await ctx.session.$revoke()
}
