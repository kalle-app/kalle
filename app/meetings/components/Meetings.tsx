import { Card, Row, Col, Button } from "react-bootstrap"
import type { Meeting } from "db"
import { Link, useMutation } from "blitz"
import { getOrigin } from "utils/generalUtils"
import deleteMeetingMutation from "../mutations/deleteMeeting"

interface MeetingsProps {
  meetings: Meeting[]
}

const Meetings = (props: MeetingsProps) => {
  const [deleteMeeting] = useMutation(deleteMeetingMutation)

  const submitDeletion = async (meetingId: number) => {
    try {
      const meeting = await deleteMeeting(meetingId)
      const index = meetings.findIndex((meeting) => meeting.id === meetingId)
      meetings.splice(index, 1)
    } catch (error) {
      alert(error)
    }
  }

  const { meetings } = props
  if (meetings.length < 1) {
    return <p>No Meetings available</p>
  }

  return (
    <ul>
      {meetings.map((meeting) => {
        const end = meeting.endDate.toString()
        const start = meeting.startDate.toString()

        const href = `/schedule/${meeting.ownerName}/${meeting.link}`
        const hrefToDisplay = getOrigin() + href

        return (
          <Card
            as="li"
            key={meeting.id + meeting.ownerName + meeting.name}
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
            <div className="d-flex justify-content-end">
              <Button
                variant="outline-primary"
                onClick={() => {
                  submitDeletion(meeting.id)
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        )
      })}
    </ul>
  )
}

export default Meetings
