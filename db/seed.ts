import db from "."
import { johnDoe } from "./seed-data"

function mockHashPassword(pw: string) {
  if (pw === johnDoe.password) {
    return "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJGxHQ2ZUekxQam9YZ25DMjZMcGV1R3ckYjJyTlA1bTBQdWc4QUZBTG9UYlJXM2cxLytiQlZ5VjFnZ29pUlE4YjVxVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
  }
}

async function main() {
  const user = await db.user.create({
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

  const calendar = await db.connectedCalendar.findFirst({
    where: { ownerId: user.id },
  })

  if (!user || !calendar) {
    throw new Error("Seeding failed")
  }

  await db.defaultCalendar.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      calendar: {
        connect: { id: calendar.id },
      },
    },
  })

  process.exit(0)
}

main()
