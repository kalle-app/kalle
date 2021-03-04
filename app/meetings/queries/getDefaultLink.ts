import db, { Meeting } from "db"
import { Ctx } from "blitz"
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator"

function createNewName() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 3,
    separator: "-",
  })
}

export default async function getDefaultLink(_ = null, ctx: Ctx) {
  ctx.session.$authorize()

  const meetings = await db.meeting.findMany({
    where: {
      owner: {
        id: {
          equals: ctx.session.userId,
        },
      },
    },
  })

  let defaultLink = createNewName()

  if (meetings) {
    let foundLink = false
    while (!foundLink) {
      if (meetings.some((meeting: Meeting) => meeting.link === defaultLink)) {
        defaultLink = createNewName()
      } else {
        foundLink = true
      }
    }
  }

  return defaultLink
}
