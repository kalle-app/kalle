import { CalendarConnectionDetails, makeRequestTo } from "./index"

export async function getConnectionString(calendar: CalendarConnectionDetails) {
  await makeRequestTo(calendar, {
    headers: { DEPTH: 0 },
    method: "PROPFIND",
    data: `
                <propfind xmlns='DAV:'>
                    <prop>
                        <current-user-principal/>
                    </prop>
                </propfind>
            `,
  })
}
