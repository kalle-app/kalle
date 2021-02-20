import getSchedules from "app/meetings/queries/getSchedules"
import { useQuery } from "blitz"
import React from "react"
import { Card, Col, ListGroup, Row } from "react-bootstrap"

const AllSchedules = () => {
  const [schedules] = useQuery(getSchedules, null)
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
              </ListGroup>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default AllSchedules
