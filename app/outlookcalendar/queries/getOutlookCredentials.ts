import db from "db"

export default async function getOutlookCredentials(userId: number) {
  const calendars = await db.connectedCalendar.findFirst({
    where: { ownerId: userId, type: "Outlook Calendar" },
  })
  return calendars
}
