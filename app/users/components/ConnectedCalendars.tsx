import { ConnectedCalendar } from "@prisma/client"
import { useState } from "react"
import { useMutation, invalidateQuery, useQuery } from "blitz"
import { Button, Table } from "react-bootstrap"
import deleteConnectedCalendar from "../mutations/deleteConnectedCalendar"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import Form from "react-bootstrap/Form"
import updateDefaultCalendar from "../mutations/updateDefaultCalendar"
import getDefaultCalendarByUser from "../queries/getDefaultCalendarByUser"
interface ConnectedCalendarsProps {
  calendars: Omit<ConnectedCalendar, "encryptedPassword">[]
  defaultCalendarId: number
}

const ConnectedCalendars = (props: ConnectedCalendarsProps) => {
  const [validated, setValidated] = useState(false)
  const [deleteCalendar] = useMutation(deleteConnectedCalendar)
  const [changeDefaultCalendar] = useMutation(updateDefaultCalendar)
  const [defaultCalendarId] = useQuery(getDefaultCalendarByUser, null)

  const submitDeletion = async (calendarId: number) => {
    const calendar = await deleteCalendar(calendarId)
    invalidateQuery(getConnectedCalendars)
  }
  const onChange = (event) => {
    changeDefaultCalendar(parseInt(event.target.value))
  }
  var dropdownElements: Array<JSX.Element> = []

  //if (props.defaultCalendarId === null) dropdownElements.push(<option key={-1} value={-1}>Kalender auswählen</option>);
  props.calendars.forEach((calendar) => {
    dropdownElements.push(
      <option key={calendar.id} value={calendar.id}>
        {calendar.name}
      </option>
    )
  })

  return (
    <div>
      {props.calendars.length > 0 && (
        <Form className="m-3" validated={validated} noValidate>
          <Form.Group controlId="formName">
            <Form.Label>Select your default calendar:</Form.Label>
            <Form.Control
              as="select"
              name="defaultCalendar"
              defaultValue={props.defaultCalendarId}
              onChange={onChange}
            >
              {dropdownElements}
            </Form.Control>
          </Form.Group>
        </Form>
      )}
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
