import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

type MeetingsProps = {
  meetings?: any[]
}

const Meetings = (props: MeetingsProps) => {
  if (!props.meetings || props.meetings?.length < 1) {
    return <p>No Meetings available</p>
  }

  return (
    <>
      {props.meetings.map((meeting) => {
        const end = meeting.endDate.toString()
        const start = meeting.startDate.toString()
        const href = "www.kalle.app/schedule/".concat(meeting.ownerName, "/", meeting.link)
        return (
          <div className="my-5 text-left">
            <Card key={meeting.id + meeting.ownerId + meeting.name} className="p-3">
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
                  <a className="my-auto" href={href}>
                    {href}
                  </a>
                </Col>
              </Row>
            </Card>
          </div>
        )
      })}
    </>
  )
}

export default Meetings
