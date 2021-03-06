import { ScheduleInput } from "app/auth/validations"
import { SearchableDropdown } from "app/components/SearchableDropdown"
import getScheduleNames from "app/meetings/queries/getScheduleNames"
import getSchedules from "app/meetings/queries/getSchedules"
import { invalidateQuery, useMutation } from "blitz"
import React, { useState } from "react"
import { Alert, Button, Col, Form, Modal } from "react-bootstrap"
import addSchedule from "../../mutations/addSchedule"
import timezones from "./tz"
import { mapValues } from "utils/map-values"

interface AddScheduleProps {
  show: boolean
  setVisibility: (value: boolean) => void
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const
type Schedules = Record<typeof days[number], { start: string; end: string }>

export const isScheduleWellFormed = (schedules: Schedules) => {
  return Object.values(schedules).every(({ start, end }) => isBefore(start, end))
}

export const isBefore = (startTime: string, endTime: string) => {
  const start = parseTime(startTime)
  const end = parseTime(endTime)

  if (!start || !end) {
    return false
  }

  console.log("start 0, end 0,", start[0], "and", end[0])
  console.log("start 0, end 0,", start[1], "and", end[1])

  if (start[0] === end[0]) {
    // handle explicitly blocked dates ("00:00 - 00:00")
    if (start[0] === 0) {
      return start[1] === 0 && end[1] === 0
    }
    return start[1] < end[1]
  }

  return start[0] < end[0]
}

export const parseTime = (time: string): [start: number, end: number] | null => {
  const parts = time.split(":")
  if (parts.length !== 2) {
    return null
  }

  const [hours, minutes] = parts.map((v) => parseInt(v))
  if (hours < 0 || hours > 23) {
    return null
  }

  if (minutes < 0 || minutes > 59) {
    return null
  }

  return [hours, minutes]
}

const initialSchedule = {
  monday: { blocked: false, start: "09:00", end: "17:00" },
  tuesday: { blocked: false, start: "09:00", end: "17:00" },
  wednesday: { blocked: false, start: "09:00", end: "17:00" },
  thursday: { blocked: false, start: "09:00", end: "17:00" },
  friday: { blocked: false, start: "09:00", end: "17:00" },
  saturday: { blocked: true, start: "00:00", end: "00:00" },
  sunday: { blocked: true, start: "00:00", end: "00:00" },
}

const AddSchedule = (props: AddScheduleProps) => {
  const [createScheduleMutation] = useMutation(addSchedule)
  const [schedule, setSchedule] = useState(initialSchedule)
  const [name, setName] = useState("")
  const [error, setError] = useState({ error: false, message: "" })
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [message, setMessage] = useState("")

  const scheduleChanged = (value: any, day: string, type: string) => {
    setSchedule({
      ...schedule,
      [day]: { ...schedule[day], [type]: value },
    })
  }

  const nameChanged = (e: any) => {
    setName(e.currentTarget.value)
  }

  const closeModal = (): void => {
    setError({ error: false, message: "" })
    setName("")
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    setSchedule(initialSchedule)
    props.setVisibility(false)
  }

  const submit = async () => {
    const parseResult = ScheduleInput.refine((data) => isScheduleWellFormed(data.schedule), {
      message: "Please check the entered times. Expected is a format of hour:minutes, e.g. 09:30",
    }).safeParse({
      name,
      schedule,
    })

    if (!parseResult.success) {
      setMessage(parseResult.error.errors[0].message)
      return
    }

    try {
      await createScheduleMutation({
        name: name,
        timezone,
        schedule: mapValues(schedule, ({ blocked, start, end }) =>
          blocked ? { startTime: "00:00", endTime: "00:00" } : { startTime: start, endTime: end }
        ),
      })
      await invalidateQuery(getSchedules)
      await invalidateQuery(getScheduleNames)
      closeModal()
    } catch (error) {
      setError({ error: true, message: error })
    }
  }

  return (
    <Modal show={props.show} onHide={() => closeModal()}>
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
          <Form.Group>
            <SearchableDropdown
              description="Change time zone"
              options={timezones}
              onSelect={setTimezone}
              value={timezone}
            />
          </Form.Group>
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
          {error.error && (
            <Alert variant="danger">Couldn't add the schedule: {error.message}</Alert>
          )}
        </Form>
        <Form.Text className="text-danger">{message}</Form.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeModal()}>
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
