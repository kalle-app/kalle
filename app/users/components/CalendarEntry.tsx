import { ConnectedCalendar } from "@prisma/client"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

type CalendarEntryProps = {
  calendar: Omit<ConnectedCalendar, "encryptedPassword">
}

const CalendarEntry = (props: CalendarEntryProps) => {
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

export default CalendarEntry
