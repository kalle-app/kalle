import db from "db"
import { resolver } from "blitz"
import { UpdateUserInput } from "../../auth/validations"
import { hashPassword } from "app/auth/auth-utils"

export default resolver.pipe(
  resolver.zod(UpdateUserInput),
  resolver.authorize(),
  async ({ email, name, password }, ctx) => {
    const hashedPassword = await hashPassword(password)

    const user = await db.user.update({
      where: {
        id: ctx.session.userId,
      },
      data: {
        name: name,
        email: email.toLowerCase(),
        hashedPassword,
      },
    })

    return user
  }
)
