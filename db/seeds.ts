import db from "db"

export const johnDoe = {
  email: "john.doe@kalle.app",
  fullName: "John Doe",
  password: "supersecurepassword",

  calendars: {
    baikal: {
      name: "Baikal",
      caldavAddress: "http://localhost:5232/dav.php/calendars/john.doe/test/",
      username: "john.doe",
      password: "root",
      encryptedPassword: "ef87:y/u5eQgq3kbwuH8zeP/DVQ==:k3egrw==",
    },
  },
}

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

      calendars: {
        create: {
          caldavAddress: johnDoe.calendars.baikal.caldavAddress,
          encryptedPassword: johnDoe.calendars.baikal.encryptedPassword,
          name: johnDoe.calendars.baikal.name,
          username: johnDoe.calendars.baikal.username,
          status: "active",
          type: "CalDav",
        },
      },
    },
  })
}
