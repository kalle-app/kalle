import { CalendarConnectionDetails, makeRequestTo } from "./index"

export async function getConnectionString(calendar: CalendarConnectionDetails) {
  calendar.url = "https://caldav.icloud.com"
  console.log("making the request")
  console.log(calendar)
  const z = await makeRequestTo(calendar, {
    headers: { DEPTH: 0 },
    method: "PROPFIND",
    data: `
                <propfind xmlns='DAV:'>
                    <prop>
                        <current-user-principal/>
                    </prop>
                </propfind>
            `,
    }
  )
  console.log("response", z.data.toString())
}
