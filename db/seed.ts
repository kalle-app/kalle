import db from "."
import { johnDoe } from "./seed-data"

function mockHashPassword(pw: string) {
  if (pw === johnDoe.password) {
    return "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJHBZcE9sWVB0UkNVeTNkMXk4SFAvZGckNUJPWG5YRnpDZm03OXdsR0ljVjFYRmVsbFBmZjdnNXVEN3NxbFFXM1EvQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
  }
}

async function main() {
  await db.user.create({
    data: {
      name: johnDoe.fullName,
      username: johnDoe.username,
      email: johnDoe.email,
      hashedPassword: mockHashPassword(johnDoe.password),

      calendars: {
        create: {
          caldavAddress: johnDoe.calendars.baikal.caldavAddress,
          encryptedPassword: johnDoe.calendars.baikal.encryptedPassword,
          name: johnDoe.calendars.baikal.name,
          username: johnDoe.calendars.baikal.username,
          status: "active",
          type: "CaldavDigest",
        },
      },
    },
  })

  process.exit(0)
}

main()
