import db from "db"
import { resolver } from "blitz"
import { hashPassword } from "app/auth/auth-utils"
import { SignupInput } from "app/auth/validations"

export default resolver.pipe(
  resolver.zod(SignupInput),
  async ({ username, name, password, email }, ctx) => {
    const hashedPassword = await hashPassword(password)

    try {
      const user = await db.user.create({
        data: {
          name: name,
          username: username,
          email: email.toLowerCase(),
          hashedPassword,
          role: "user",
        },
        select: { id: true, name: true, email: true, role: true },
      })

      await ctx.session!.$create({ userId: user.id, roles: [user.role] })

      return user
    } catch (error) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        throw new Error("emailAlreadyUsed")
      } else if (error.code === "P2002" && error.meta?.target?.includes("username")) {
        throw new Error("usernameAlreadyUsed")
      } else {
        throw error
      }
    }
  }
)
