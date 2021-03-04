import { ConnectedCalendar } from "@prisma/client"
import { invalidateQuery, useMutation, invoke } from "blitz"
import { Button, Table } from "react-bootstrap"
import deleteConnectedCalendar from "../mutations/deleteConnectedCalendar"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import checkIfCalendarIsDefaultCalendar from "../queries/checkIfCalendarIsDefaultCalendar"
import getMeetingsToCalendar from "../queries/getMeetingsToCalendar"
interface ConnectedCalendarsProps {
  calendars: Omit<ConnectedCalendar, "encryptedPassword">[]
}

const ConnectedCalendars = (props: ConnectedCalendarsProps) => {
  const [deleteCalendar] = useMutation(deleteConnectedCalendar)

  const submitDeletion = async (calendarId: number) => {
    const meetings = await invoke(getMeetingsToCalendar, calendarId)
    if (meetings.length > 0) {
      alert("You have still some meetings connected to this calendar! Please delete them.")
      return
    }
    if (await invoke(checkIfCalendarIsDefaultCalendar, calendarId)) {
      alert(
        "You are trying to delete your default calendar! Please select another calendar as default before deleting it."
      )
      return
    }
    await deleteCalendar(calendarId)
    invalidateQuery(getConnectedCalendars)
  }

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
              <Button variant="link" onClick={() => submitDeletion(calendarEntry.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ConnectedCalendars
