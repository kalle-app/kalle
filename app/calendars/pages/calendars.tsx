import { BlitzPage, useQuery } from "blitz"
import getCalendars from "app/calendars/queries/getCalendars"
import { Suspense } from "react"

function CalendarsList() {
  const [calendars] = useQuery(getCalendars, null)

  return (
    <ul>
      {calendars?.map((calendar, i) => {
        return (
          <li className="flex justify-center items-center">
            <h3 className="text-blue-400 p-5 shadow border">{calendar.id}</h3>
            <p className="text-red-400">{calendar.caldavAddress}</p>
          </li>
        )
      })}
    </ul>
  )
}

const Calendars: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading ...">
        <CalendarsList />
      </Suspense>
    </div>
  )
}

export default Calendars
