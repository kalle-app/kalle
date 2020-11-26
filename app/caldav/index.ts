import * as urllib from "urllib"
import * as ical from "node-ical"

interface CalendarConnectionDetails {
  url: string
  auth: {
    username: string
    password: string
    digest?: boolean
  }
}

async function makeRequestTo(
  calendar: CalendarConnectionDetails,
  {
    data,
    method,
    headers,
  }: { method: string; data: string; headers: Record<string, string | number> }
) {
  const authString = `${calendar.auth.username}:${calendar.auth.password}`
  return await urllib.request(calendar.url, {
    ...(calendar.auth.digest ? { digestAuth: authString } : { auth: authString }),
    method: method as any,
    headers: headers as any,
    data,
  })
}

// currently not working on default calender
export async function freeBusy(calendar: CalendarConnectionDetails) {
  const response = await makeRequestTo(calendar, {
    headers: {
      Depth: 1,
    },
    method: "REPORT",
    data: `<?xml version="1.0"?>
           <c:free-busy-query xmlns:c="urn:ietf:params:xml:ns:caldav">
           <c:time-range start="20201123T000000Z" end="20201127T000000Z" />
           </c:free-busy-query>`,
  })
  const result = ical.sync.parseICS(response.data.toString())
  const id = Object.keys(result)[0]
  return result[id]["freebusy"]
}
