import db from "db"

export default async function getUserByName(name: string) {
  const user = await db.user.findUnique({
    where: { username: name }
  })

  return user
}