import getSchedules from "app/meetings/queries/getSchedules"
import { useQuery, useMutation, invalidateQuery } from "blitz"
import React, { useState } from "react"
import { Card, Col, ListGroup, Row, Button, Alert } from "react-bootstrap"
import deleteScheduleMutation from "../../mutations/deleteSchedule"

const AllSchedules = () => {
  const [schedules] = useQuery(getSchedules, null)
  const [deleteMeeting] = useMutation(deleteScheduleMutation)
  const [message, setMessage] = useState("")

  const submitDeletion = async (scheduleId: number) => {
    const result = await deleteMeeting(scheduleId)
    if (result === "error") {
      setMessage("There are still meetings with this schedule")
    } else {
      invalidateQuery(getSchedules)
    }
  }

  return (
    <Row>
      {schedules.map((schedule) => {
        return (
          <Col md={4} className="m-5" key={schedule.id}>
            <Card>
              <Card.Header className="text-center">{schedule.name}</Card.Header>
              <ListGroup variant="flush">
                {schedule.dailySchedules.map((dailySchedule) => {
                  return (
                    <ListGroup.Item key={dailySchedule.day}>
                      <Row>
                        <Col sm={6}>
                          <b>
                            {dailySchedule.day.charAt(0).toUpperCase() + dailySchedule.day.slice(1)}
                            :{" "}
                          </b>
                        </Col>
                        <Col sm={6}>
                          {dailySchedule.startTime} - {dailySchedule.endTime}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
                <ListGroup.Item>
                  <Row>
                    <Col sm={6}>
                      <b>Timezone</b>
                    </Col>
                    <Col sm={6}>{schedule.timezone}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="d-flex justify-content-center">
                      {message !== "" && (
                        <Alert variant="danger" className="mt-2">
                          {message}
                        </Alert>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          submitDeletion(schedule.id)
                        }}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default AllSchedules
