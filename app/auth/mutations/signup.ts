import db from "db"
import { Ctx } from "blitz"
import { hashPassword } from "app/auth/auth-utils"
import { SignupInput, SignupInputType } from "app/auth/validations"

export default async function signup(input: SignupInputType, ctx: Ctx) {
  // This throws an error if input is invalid
  const { name, username, email, password } = SignupInput.parse(input)

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

    await ctx.session!.create({ userId: user.id, roles: [user.role] })

    return user
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      throw new Error("email_already_used")
    } else if (error.code === "P2002" && error.meta?.target?.includes("username")) {
      throw new Error("username_already_used")
    } else {
      throw error
    }
  }
}
