import { ConnectedCalendar } from "@prisma/client"
import Button from "./Button"
import ConnectedCalendardsEntry from "./ConnectedCalendarsEntry"

type ConnectedCalendarsListProps = {
  calendars: ConnectedCalendar[]
  toggleModal
}

const ConnectedCalendarsList = (props: ConnectedCalendarsListProps) => {
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
          {props.calendars?.map((calendarEntry, index) => {
            return <ConnectedCalendardsEntry key={index} calendar={calendarEntry} />
          })}
        </tbody>
      </table>

      <div className="text-right sm:px-6 my-3">
        <Button onClick={props.toggleModal} type="submit">
          Add Calendar
        </Button>
      </div>
    </div>
  )
}

export default ConnectedCalendarsList
