import { ConnectedCalendar } from "@prisma/client"
import { Link } from "blitz"
import { Button, Table } from "react-bootstrap"

interface ConnectedCalendarsProps {
  calendars: Omit<ConnectedCalendar, "encryptedPassword">[]
}

const ConnectedCalendars = (props: ConnectedCalendarsProps) => {
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
            <td className="align-middle">{calendarEntry.name}</td>
            <td className="align-middle">{calendarEntry.type}</td>
            <td className="align-middle">{calendarEntry.status}</td>
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
