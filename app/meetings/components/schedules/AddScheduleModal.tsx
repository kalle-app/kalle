import getScheduleNames from "app/meetings/queries/getScheduleNames"
import getSchedules from "app/meetings/queries/getSchedules"
import { invalidateQuery, useMutation } from "blitz"
import React, { useState } from "react"
import { Button, Col, Form, Modal } from "react-bootstrap"
import addSchedule from "../../mutations/addSchedule"
import { ScheduleInput } from "app/auth/validations"

interface AddScheduleProps {
  show: boolean
  setVisibility: (value: boolean) => void
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

const initialSchedule = {
  monday: { blocked: false, start: "09:00", end: "17:00" },
  tuesday: { blocked: false, start: "09:00", end: "17:00" },
  wednesday: { blocked: false, start: "09:00", end: "17:00" },
  thursday: { blocked: false, start: "09:00", end: "17:00" },
  friday: { blocked: false, start: "09:00", end: "17:00" },
  saturday: { blocked: true, start: "", end: "" },
  sunday: { blocked: true, start: "", end: "" },
}

const AddSchedule = (props: AddScheduleProps) => {
  const [createScheduleMutation] = useMutation(addSchedule)
  const [schedule, setSchedule] = useState(initialSchedule)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const scheduleChanged = (value: any, day: string, type: string) => {
    let newDay = { ...schedule[day], [type]: value }
    setSchedule({
      ...schedule,
      [day]: newDay,
    })
  }

  const nameChanged = (e: any) => {
    setName(e.currentTarget.value)
  }

  const checkSchedules = (schedules) => {
    for (const key in schedules) {
      if (!schedule[key].blocked) {
        if (!checkTime(schedule[key].start, schedule[key].end)) {
          return false
        }
      }
    }
    return true
  }

  const checkTime = (startTime, endTime) => {
    const start = parseTime(startTime)
    const end = parseTime(endTime)
    if (start !== [] && end !== []) {
      const startValue = parseInt(`${start[0]}${start[1]}`)
      const endValue = parseInt(`${end[0]}${end[1]}`)
      if (startValue <= endValue) {
        return true
      }
    }
    return false
  }

  const parseTime = (time) => {
    const parts = time.split(":")
    if (parts.length === 2) {
      if (parts[0].trim().length === 2 && parts[1].trim().length === 2) {
        const hour = parseInt(time[0])
        const minute = parseInt(time[1])
        if (!Number.isNaN(hour) && !Number.isNaN(minute)) {
          if (hour >= 0 && hour <= 23) {
            if (minute >= 0 && minute <= 59) {
              return [hour, minute]
            }
          }
        }
      }
    }
    return []
  }

  const submit = () => {
    let postSchedule = {
      name: name,
      schedule: {
        monday: schedule.monday.blocked ? ["", ""] : [schedule.monday.start, schedule.monday.end],
        tuesday: schedule.tuesday.blocked
          ? ["", ""]
          : [schedule.tuesday.start, schedule.tuesday.end],
        wednesday: schedule.wednesday.blocked
          ? ["", ""]
          : [schedule.wednesday.start, schedule.wednesday.end],
        thursday: schedule.thursday.blocked
          ? ["", ""]
          : [schedule.thursday.start, schedule.thursday.end],
        friday: schedule.friday.blocked ? ["", ""] : [schedule.friday.start, schedule.friday.end],
        saturday: schedule.saturday.blocked
          ? ["", ""]
          : [schedule.saturday.start, schedule.saturday.end],
        sunday: schedule.sunday.blocked ? ["", ""] : [schedule.sunday.start, schedule.sunday.end],
      },
    }

    const parseResult = ScheduleInput.refine((data) => checkSchedules(data.schedule), {
      message: "Please check the entered times. Expected is a format of hour:minutes, e.g. 09:30",
    }).safeParse({
      name,
      schedule,
    })

    if (!parseResult.success) {
      setMessage(parseResult.error.errors[0].message)
      return
    }

    createScheduleMutation(postSchedule)
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
            <Form.Control
              name="name"
              value={name}
              placeholder="e.g. Workdays"
              onChange={nameChanged}
            />
          </Form.Group>
          <p>
            Please specify when you are generally available. Your invitees cannot pick a time slot
            outside of the provided window.
          </p>
          <Form.Group controlId="days">
            {days.map((day) => {
              return (
                <Form.Row key={day}>
                  <Form.Group as={Col}>
                    <Form.Label>{day.charAt(0).toUpperCase() + day.slice(1)}</Form.Label>
                    <Form.Check
                      checked={schedule[day].blocked}
                      type="checkbox"
                      label="Block all day"
                      onChange={(e: any): void => {
                        scheduleChanged(!schedule[day].blocked, day, "blocked")
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>&nbsp;</Form.Label>
                    {!schedule[day].blocked && (
                      <Form.Control
                        value={schedule[day].start}
                        onChange={(e) => {
                          scheduleChanged(e.currentTarget.value, day, "start")
                        }}
                      />
                    )}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>&nbsp;</Form.Label>
                    {!schedule[day].blocked && (
                      <Form.Control
                        // value={schedule.schedule[day][1]}
                        value={schedule[day].end}
                        onChange={(e) => {
                          scheduleChanged(e.currentTarget.value, day, "end")
                        }}
                      />
                    )}
                  </Form.Group>
                </Form.Row>
              )
            })}
          </Form.Group>
        </Form>
        <Form.Text className="text-danger">{message}</Form.Text>
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
