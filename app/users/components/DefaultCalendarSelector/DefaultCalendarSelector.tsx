import { useMutation, useQuery } from "blitz"
import { Button, Table } from "react-bootstrap"
import deleteConnectedCalendar from "../../mutations/deleteConnectedCalendar"
import getConnectedCalendars from "../../queries/getConnectedCalendars"
import Form from "react-bootstrap/Form"
import updateDefaultCalendar from "../../mutations/updateDefaultCalendar"
import { useState } from "react"
import getDefaultCalendarByUser from "../../queries/getDefaultCalendarByUser"
export enum SelectorType {
  meetingBased,
  settingsBased,
}

export const DefaultCalendarSelector = (props: {
  type: SelectorType
  onChange: (selectedDefaultCalendarId: number) => void
}) => {
  const [validated, setValidated] = useState(false)
  const [changeDefaultCalendar] = useMutation(updateDefaultCalendar)
  const [getCalendars] = useQuery(getConnectedCalendars)
  const [defaultCalendarId] = useQuery(getDefaultCalendarByUser, null)
  const calendars = getCalendars
  console.log(calendars)
  console.log("GHDGHFJ")
  const onChange = (event) => {
    //this is needed because if we need a defaultcalendar on a setting basis and on a meeting basis.
    switch (props.type) {
      case SelectorType.settingsBased:
        if (event.target.value === -1) return
        changeDefaultCalendar(parseInt(event.target.value))
        break
      case SelectorType.meetingBased:
        //
        console.log(parseInt(event.target.value))
        props.onChange(parseInt(event.target.value))
        console.log("Meetingbased")
    }
  }
  var dropdownElements: Array<JSX.Element> = []

  dropdownElements.push(
    <option key={-1} value={-1}>
      Add Calendar
    </option>
  )

  calendars.forEach((calendar) => {
    dropdownElements.push(
      <option key={calendar.id} value={calendar.id}>
        {calendar.name}
      </option>
    )
  })

  return (
    <div>
      {calendars.length > 0 && (
        <Form className="m-3" validated={validated} noValidate>
          <Form.Group controlId="formName">
            <Form.Label>Select your default calendar:</Form.Label>
            <Form.Control
              as="select"
              name="defaultCalendar"
              defaultValue={defaultCalendarId ? defaultCalendarId : -1}
              onChange={onChange}
            >
              {dropdownElements}
            </Form.Control>
          </Form.Group>
        </Form>
      )}
    </div>
  )
}
