import db from "db"
import { Ctx } from "blitz"
import { UpdateUserInput, UpdateUserInputType } from "../../auth/validations"
import { hashPassword } from "app/auth/auth-utils"

export default async function updateUserData(userId: number, input: UpdateUserInputType,  ctx: Ctx) {
  ctx.session.authorize()

  const { name, email, password } = UpdateUserInput.parse(input)
  const hashedPassword = await hashPassword(password)

  const user = await db.user.update({
    where: {
      id: userId
    },
    data: { 
      name: name,
      email: email.toLowerCase(),
      hashedPassword,
    } 
  })

  return user
}
