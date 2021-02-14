import { DailySchedule, Schedule } from "@prisma/client"
import getSchedules from "app/meetings/queries/getSchedules"
import { useQuery } from "blitz"
import React from "react"
import { Card, Col, ListGroup, Row } from "react-bootstrap"

const AllSchedules = () => {
  const [schedules] = useQuery(getSchedules, null)
  return (
    <Row>
      {schedules!.map((schedule: Schedule & { dailySchedules: DailySchedule[] }) => {
        return (
          <Col md={4} className="m-5" key={schedule.id}>
            <Card>
              <Card.Header className="text-center">{schedule.name}</Card.Header>
              <ListGroup variant="flush">
                {schedule.dailySchedules.map((dailySchedule: DailySchedule) => {
                  return (
                    <ListGroup.Item key={dailySchedule.day}>
                      <b>{dailySchedule.day[0].toUpperCase() + dailySchedule.day.substring(1)}: </b>
                      {dailySchedule.startTime} - {dailySchedule.endTime}
                    </ListGroup.Item>
                  )
                })}
                <ListGroup.Item>
                  <b>Timezone: </b>
                  {schedule.timezone?.toString()}
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
