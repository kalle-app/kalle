import { verifyConnectionDetails, CalendarConnectionDetails } from "app/caldav"

export default async function authenticateCalDav(calendar: CalendarConnectionDetails) {
  const res = await verifyConnectionDetails(calendar)
  return res
}
