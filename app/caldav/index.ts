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

interface TimeSlot {
  start: Date
  end: Date
}

interface Event {
  title: string
  start: Date
  end: Date
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
  return await urllib.request<Buffer>(calendar.url, {
    ...(calendar.auth.digest ? { digestAuth: authString } : { auth: authString }),
    method: method as any,
    headers: headers as any,
    data,
  })
}

function formatDateString(date: Date) {
  return date.toISOString().replace("-", "").replace(":", "").split(".")[0] + "Z"
}

function icsEventsToInternalEvents(ics: string): Event[] {
  const parsed = ical.sync.parseICS(ics)
  const ids = Object.keys(parsed)
  const events: Event[] = []
  for (let id of ids) {
    if (parsed[id]["type"] === "VEVENT") {
      events.push({
        title: parsed[id]["summary"] as any,
        start: parsed[id]["start"] as any,
        end: parsed[id]["end"] as any,
      })
    }
  }
  events.sort((a, b) => (a.start > b.start ? 1 : -1))
  return events
}

export async function getEvents(calendar: CalendarConnectionDetails, start: Date, end: Date) {
  const formattedStart = formatDateString(start)
  const formattedEnd = formatDateString(end)

  const response = await makeRequestTo(calendar, {
    headers: {
      Depth: 1,
    },
    method: "REPORT",
    data: `
      <?xml version="1.0"?>
      <c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">

        <d:prop>
          <d:getetag />
          <c:calendar-data />
        </d:prop>

        <c:filter>
          <c:comp-filter name="VCALENDAR">
            <c:comp-filter name="VEVENT">
              <c:time-range
                start="${formattedStart}"
                end="${formattedEnd}"
              />
            </c:comp-filter>
          </c:comp-filter>
        </c:filter>

      </c:calendar-query>`.trim(),
  })

  return icsEventsToInternalEvents(response.data.toString())
}

function icsFreeBusyToInternalFreeBusy(ics: string): TimeSlot[] {
  const parsed = ical.sync.parseICS(ics)
  const id = Object.keys(parsed)[0]
  const timeslots: TimeSlot[] = []
  if (parsed[id].hasOwnProperty("freebusy")) {
    for (let slot of parsed[id]["freebusy"]) {
      timeslots.push({ start: slot["start"], end: slot["end"] })
    }
  }
  return timeslots
}

// currently not working on baikal's default calender
export async function getTakenTimeSlots(
  calendar: CalendarConnectionDetails,
  start: Date,
  end: Date
) {
  const formattedStart = formatDateString(start)
  const formattedEnd = formatDateString(end)

  const response = await makeRequestTo(calendar, {
    headers: {
      Depth: 1,
    },
    method: "REPORT",
    data: `
      <?xml version="1.0"?>
      <c:free-busy-query xmlns:c="urn:ietf:params:xml:ns:caldav">
        <c:time-range
          start="${formattedStart}"
          end="${formattedEnd}"
        />
      </c:free-busy-query>`.trim(),
  })

  return icsFreeBusyToInternalFreeBusy(response.data.toString())
}
