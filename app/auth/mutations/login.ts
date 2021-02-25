import { authenticateUser } from "app/auth/auth-utils"
import { LoginInput } from "../validations"
import { resolver } from "blitz"

export default resolver.pipe(resolver.zod(LoginInput), async ({ email, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)

  await ctx.session.$create({ userId: user.id, roles: [user.role] })

  return user
})
