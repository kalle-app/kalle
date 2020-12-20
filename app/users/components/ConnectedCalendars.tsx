import { ConnectedCalendar } from "@prisma/client"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

type EntryProps = {
  calendar: Omit<ConnectedCalendar, "encryptedPassword">
}

const Entry = (props: EntryProps) => {
  return (
    <Row className="m-3">
      <Col className="my-auto">
        <p className="my-auto">{props.calendar.name}</p>
      </Col>
      <Col className="my-auto">
        <p className="my-auto">{props.calendar.type}</p>
      </Col>
      <Col className="my-auto">
        <p className="my-auto">{props.calendar.status}</p>
      </Col>
      <Col>
        <Button variant="link">Edit</Button>
      </Col>
    </Row>
  )
}

type ConnectedCalendarsProps = {
  calendars: Omit<ConnectedCalendar, "encryptedPassword">[]
}

const ConnectedCalendars = (props: ConnectedCalendarsProps) => {
  return (
    <div>
      <Row className="bg-light m-3">
        <Col className="my-auto py-2">
          <p className="my-auto">NAME</p>
        </Col>
        <Col className="my-auto py-2">
          <p className="my-auto">TYPE</p>
        </Col>
        <Col className="my-auto py-2">
          <p className="my-auto">STATUS</p>
        </Col>
        <Col></Col>
      </Row>
      {props.calendars?.map((calendarEntry, index) => {
        return <Entry key={index} calendar={calendarEntry} />
      })}
    </div>
  )
}

export default ConnectedCalendars
