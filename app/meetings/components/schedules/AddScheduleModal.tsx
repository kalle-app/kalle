import getScheduleNames from "app/meetings/queries/getScheduleNames"
import getSchedules from "app/meetings/queries/getSchedules"
import { invalidateQuery, useMutation } from "blitz"
import React, { useState } from "react"
import { Button, Col, Form, Modal } from "react-bootstrap"
import addSchedule from "../../mutations/addSchedule"

interface AddScheduleProps {
  show: boolean
  setVisibility: (value: boolean) => void
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

const initialSchedule = {
  name: "",
  schedule: {
    monday: ["9:00", "17:00"],
    tuesday: ["9:00", "17:00"],
    wednesday: ["9:00", "17:00"],
    thursday: ["9:00", "17:00"],
    friday: ["9:00", "17:00"],
    saturday: ["", ""],
    sunday: ["", ""],
  },
}

const AddSchedule = (props: AddScheduleProps) => {
  const [schedule, setSchedule] = useState(initialSchedule)
  const [createScheduleMutation] = useMutation(addSchedule)

  const scheduleChanged = (e: any, day: string, type: string) => {
    const position = type === "start" ? 0 : 1
    let newSchedule = schedule
    newSchedule.schedule[day][position] = e.currentTarget.value
    setSchedule(newSchedule)
  }

  const nameChanged = (e: any) => {
    setSchedule({
      ...schedule,
      name: e.currentTarget.value,
    })
  }

  const submit = () => {
    createScheduleMutation(schedule)
      .then(async (data) => {
        await invalidateQuery(getSchedules)
        await invalidateQuery(getScheduleNames)
        props.setVisibility(false)
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <Modal show={props.show} onHide={() => props.setVisibility(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={schedule.name} onChange={nameChanged} />
          </Form.Group>
          <Form.Group controlId="days">
            {days.map((day) => {
              return (
                <Form.Row key={day}>
                  <Form.Group as={Col}>
                    <Form.Label>{day.charAt(0).toUpperCase() + day.slice(1)}</Form.Label>
                    <Form.Control
                      value={schedule.schedule[day][0]}
                      onChange={(e) => {
                        scheduleChanged(e, day, "start")
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>&nbsp;</Form.Label>
                    <Form.Control
                      value={schedule.schedule[day][1]}
                      onChange={(e) => {
                        scheduleChanged(e, day, "end")
                      }}
                    />
                  </Form.Group>
                </Form.Row>
              )
            })}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setVisibility(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => submit()}>
          Save Schedule
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddSchedule
