import { AuthenticationError, SecurePassword } from "blitz"
import db from "db"

export const hashPassword = async (password: string): Promise<string> => {
  return await SecurePassword.hash(password)
}

export const authenticateUser = async (email: string, password: string) => {
  const user = await db.user.findOne({ where: { email: email.toLowerCase() } })

  if (!user || !user.hashedPassword) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, password)

  switch (result) {
    case SecurePassword.VALID:
      break
    case SecurePassword.VALID_NEEDS_REHASH:
      // Upgrade hashed password with a more secure hash
      const improvedHash = await hashPassword(password)
      await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
      break
    default:
      throw new AuthenticationError()
  }

  const { hashedPassword, ...rest } = user
  return rest
}
