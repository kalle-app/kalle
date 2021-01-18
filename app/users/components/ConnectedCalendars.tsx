import { Link } from "blitz"
import { Button, Table } from "react-bootstrap"

interface CalendarCredentialsOverviewProps {
  calendars: CalendarCredentialsOverview[]
}

interface CalendarCredentialsOverview {
  id: number
  name: string
  type: string
  status: string | null
}

const ConnectedCalendars = (props: CalendarCredentialsOverviewProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.calendars.map((calendarEntry) => (
          <tr key={calendarEntry.id}>
            <td>{calendarEntry.name}</td>
            <td>{calendarEntry.type}</td>
            <td>{calendarEntry.status}</td>
            <td>
              <Link href="/tobeimplemented">
                <Button variant="link">Edit</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ConnectedCalendars
