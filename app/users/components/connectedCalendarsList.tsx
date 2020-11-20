import { useQuery } from "blitz"
import Button from "./button"
import ConnectedCalendardsEntry from "./connectedCalendarsEntry"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import { ConnectedCalendar } from "@prisma/client"

const ConnectedCalendarsList = () => {
  const [calendarEntries] = useQuery(getConnectedCalendars, null)

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {calendarEntries?.map((calendarEntry, index) => {
            return <ConnectedCalendardsEntry key={index} calendar={calendarEntry} />
          })}
        </tbody>
      </table>

      <div className="bg-gray-50 text-right sm:px-6 my-3">
        <Button title="Add Calendar" />
      </div>
    </div>
  )
}

export default ConnectedCalendarsList
