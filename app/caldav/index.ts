import * as urllib from "urllib"
import * as ical from "node-ical"
import _ from "lodash"

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
  return await urllib.request<Buffer>(calendar.url, {
    ...(calendar.auth.digest ? { digestAuth: authString } : { auth: authString }),
    method: method as any,
    headers: headers as any,
    data,
  })
}

interface ExternalEvent {
  title?: string
  start: Date
  end: Date
}

function formatDateString(date: Date) {
  return date.toISOString().replace(/-/g, "").replace(/:/g, "").split(".")[0] + "Z"
}

function isEvent(component: ical.CalendarComponent): component is ical.VEvent {
  return component.type === "VEVENT"
}

async function icsEventsToInternalEvents(ics: string): Promise<ExternalEvent[]> {
  const parsed = await ical.async.parseICS(ics)
  const icsEvents = Object.values(parsed).filter(isEvent)
  const internalEvents = icsEvents.flatMap((ev): ExternalEvent[] => {
    if (ev.transparency === "TRANSPARENT") {
      return []
    }
    return [
      {
        start: ev.start,
        end: ev.end,
        title: ev.summary,
      },
    ]
  })

  return _.sortBy(internalEvents, "start")
}

export async function getEvents(calendar: CalendarConnectionDetails, start: Date, end: Date) {
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
                start="${formatDateString(start)}"
                end="${formatDateString(end)}"
              />
            </c:comp-filter>
          </c:comp-filter>
        </c:filter>

      </c:calendar-query>`.trim(),
  })

  return await icsEventsToInternalEvents(response.data.toString())
}

interface VFreeBusy {
  type: "VFREEBUSY"
  params: any[]
  datetype: "date-time"
  start: ical.DateWithTimeZone
  end: ical.DateWithTimeZone
  dtstamp: ical.DateWithTimeZone
  freebusy?: {
    type: "FREE" | "BUSY" | "BUSY-TENTATIVE" | string
    start: ical.DateWithTimeZone
    end: ical.DateWithTimeZone
  }[]
}

function isFreeBusy(component: any): component is VFreeBusy {
  return (component.type as any) === "VFREEBUSY"
}

async function icsFreeBusyToInternalFreeBusy(ics: string): Promise<ExternalEvent[]> {
  const parsed = await ical.async.parseICS(ics)
  const icsFreeBusy = Object.values(parsed as any).filter(isFreeBusy)

  const internalFreeBusy = icsFreeBusy.flatMap(
    (v) =>
      v.freebusy?.flatMap((fb) => {
        if (fb.type === "FREE") {
          return []
        }
        return [
          {
            start: fb.start,
            end: fb.end,
          },
        ]
      }) ?? []
  )

  return _.sortBy(internalFreeBusy, "start")
}

// currently not working on baikal's default calender
export async function getTakenTimeSlots(
  calendar: CalendarConnectionDetails,
  start: Date,
  end: Date
) {
  const response = await makeRequestTo(calendar, {
    headers: {
      Depth: 1,
    },
    method: "REPORT",
    data: `
      <?xml version="1.0"?>
      <c:free-busy-query xmlns:c="urn:ietf:params:xml:ns:caldav">
        <c:time-range
          start="${formatDateString(start)}"
          end="${formatDateString(end)}"
        />
      </c:free-busy-query>`.trim(),
  })

  return await icsFreeBusyToInternalFreeBusy(response.data.toString())
}
