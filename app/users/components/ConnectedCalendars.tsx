import { ConnectedCalendar } from "@prisma/client"
import CalendarEntry from "./CalendarEntry"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

type ConnectedCalendarsProps = {
  calendars: Omit<ConnectedCalendar, "encryptedPassword">[]
  toggleModal
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
        return <CalendarEntry key={index} calendar={calendarEntry} />
      })}
    </div>
  )
}

export default ConnectedCalendars
