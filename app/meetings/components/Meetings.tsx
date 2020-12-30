import { Card, Row, Col } from "react-bootstrap"
import type { Meeting } from "db"
import { Link } from "blitz"

interface MeetingsProps {
  meetings: Meeting[]
}

function getOrigin() {
  return "location" in window ? window.location.origin : "https://kalle.app"
}

const Meetings = (props: MeetingsProps) => {
  const { meetings } = props
  if (meetings.length < 1) {
    return <p>No Meetings available</p>
  }

  return (
    <ul>
      {meetings.map((meeting) => {
        const end = meeting.endDate.toString()
        const start = meeting.startDate.toString()

        const href = `/schedule/${meeting.ownerId}/${meeting.link}`
        const hrefToDisplay = getOrigin() + href

        return (
          <Card
            as="li"
            key={meeting.id + meeting.ownerId + meeting.name}
            id={"" + meeting.id}
            className="p-3 my-5 text-left"
          >
            <h5 className="pb-3 font-weight-bold">{meeting.name}</h5>
            <Row>
              <Col sm={4} className="my-auto">
                <p className="my-auto font-weight-bold">Description</p>
              </Col>
              <Col sm={8} className="my-auto pb-1">
                <p className="my-auto">{meeting.description}</p>
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="my-auto">
                <p className="my-auto font-weight-bold">Location</p>
              </Col>
              <Col sm={8} className="my-auto pb-1">
                <p className="my-auto">{meeting.location}</p>
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="my-auto">
                <p className="my-auto font-weight-bold">Duration</p>
              </Col>
              <Col sm={8} className="my-auto pb-1">
                <p className="my-auto">{meeting.duration} Minutes</p>
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="my-auto">
                <p className="my-auto font-weight-bold">Start</p>
              </Col>
              <Col sm={8} className="my-auto pb-1">
                <p className="my-auto">{start}</p>
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="my-auto">
                <p className="my-auto font-weight-bold">End</p>
              </Col>
              <Col sm={8} className="my-auto pb-1">
                <p className="my-auto">{end}</p>
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="my-auto">
                <p className="my-auto font-weight-bold">Link</p>
              </Col>
              <Col sm={8} className="my-auto">
                <Link href={href}>
                  <a className="my-auto">{hrefToDisplay}</a>
                </Link>
              </Col>
            </Row>
          </Card>
        )
      })}
    </ul>
  )
}

export default Meetings
