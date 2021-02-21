import { ConnectedCalendar } from "@prisma/client"
import { invalidateQuery, useMutation } from "blitz"
import { Button, Table } from "react-bootstrap"
import deleteConnectedCalendar from "../mutations/deleteConnectedCalendar"
import getConnectedCalendars from "../queries/getConnectedCalendars"
interface ConnectedCalendarsProps {
  calendars: Omit<ConnectedCalendar, "encryptedPassword">[]
}

const ConnectedCalendars = (props: ConnectedCalendarsProps) => {
  const [deleteCalendar] = useMutation(deleteConnectedCalendar)
  const submitDeletion = async (calendarId: number) => {
    await deleteCalendar(calendarId)
    invalidateQuery(getConnectedCalendars)
  }

  return (
    <div>
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
                <Button variant="link" onClick={() => submitDeletion(calendarEntry.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ConnectedCalendars
