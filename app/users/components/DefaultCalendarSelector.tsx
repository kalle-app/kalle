import { useQuery } from "blitz"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import Form from "react-bootstrap/Form"
import { useState } from "react"
import getDefaultCalendarByUser from "../queries/getDefaultCalendarByUser"
export enum SelectorType {
  meetingBased,
  settingsBased,
}

export const DefaultCalendarSelector = (props: {
  state?: string
  message?: string
  information?: string
  onChange: (selectedDefaultCalendarId: number) => void
}) => {
  const [validated] = useState(false)
  const [getCalendars] = useQuery(getConnectedCalendars, null)
  const [defaultCalendar] = useQuery(getDefaultCalendarByUser, null)
  const calendars = getCalendars

  const onChange = (event) => {
    props.onChange(parseInt(event.target.value))
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
            <Form.Label>Select calendar where your bookings should be added to:</Form.Label>
            <Form.Control
              as="select"
              name="defaultCalendar"
              defaultValue={defaultCalendar!.id ? defaultCalendar!.id : -1}
              onChange={onChange}
            >
              {dropdownElements}
            </Form.Control>
            <Form.Text className={props.state + " mb-4"}>{props.message}</Form.Text>
            <Form.Text className={"mb-4"}>{props.information}</Form.Text>
          </Form.Group>
        </Form>
      )}
    </div>
  )
}
