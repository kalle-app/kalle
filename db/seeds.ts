import { johnDoe } from "cypress/user-data"
import db from "db"

function mockHashPassword(pw: string) {
  if (pw === johnDoe.password) {
    return "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJHBZcE9sWVB0UkNVeTNkMXk4SFAvZGckNUJPWG5YRnpDZm03OXdsR0ljVjFYRmVsbFBmZjdnNXVEN3NxbFFXM1EvQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
  }
}

export default async function seed() {
  await db.user.create({
    data: {
      name: johnDoe.fullName,
      email: johnDoe.email,
      hashedPassword: mockHashPassword(johnDoe.password),
    },
  })
}
