import AvailableTimeSlotsSelection from "app/appointments/components/availableTimeSlotsSelection"
import bookAppointmentMutation from "app/appointments/mutations/bookAppointment"
import getMeeting from "app/appointments/queries/getMeeting"
import getTimeSlots from "app/appointments/queries/getTimeSlots"
import type { TimeSlot } from "app/appointments/types"
import { BookingInput } from "app/auth/validations"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { areDatesOnSameDay } from "app/time-utils/comparison"
import { formatAs24HourClockString } from "app/time-utils/format"
import { BlitzPage, invalidateQuery, Link, useMutation, useParam, useQuery } from "blitz"
import { enUS } from "date-fns/locale"
import React, { Suspense, useEffect, useState } from "react"
import { Alert, Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import Skeleton from "react-loading-skeleton"
import { DatePickerCalendar } from "react-nice-dates"
import { getOrigin } from "utils/origin"
import { zonedTimeToUtc } from "date-fns-tz"

interface SchedulerProps {
  meetingSlug: string
  username: string
}

const Scheduler: React.FunctionComponent<SchedulerProps> = ({ meetingSlug, username }) => {
  const [meeting] = useQuery(getMeeting, { username: username, slug: meetingSlug })
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>()
  const [bookAppointment] = useMutation(bookAppointmentMutation)
  const [email, setEmail] = useState("")
  const [notificationTime, setNotificationTime] = useState(30)
  const [modalVisible, setModalVisible] = useState(false)
  const user = useCurrentUser()
  const [hideOccupied, setHideOccupied] = useState(false)
  const [error, setError] = useState({ error: false, message: "" })
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")

  const [slots] = useQuery(getTimeSlots, {
    meetingSlug: meetingSlug,
    ownerName: username,
    hideInviteeSlots: hideOccupied,
  })

  useEffect(() => {
    if (selectedDay) {
      return
    }

    if (!slots) {
      return
    }

    const [firstSlot] = slots
    if (!firstSlot) {
      return
    }

    setSelectedDay(firstSlot.start)
  }, [slots, selectedDay])

  useEffect(() => {
    invalidateQuery(getTimeSlots)
  }, [hideOccupied])

  if (!meeting) {
    return <h2 className="text-center m-5">This meeting was deleted or is in the past.</h2>
  }

  let currentDate = new Date()
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (meeting.endDateUTC < zonedTimeToUtc(currentDate, timezone)) {
    return <h2 className="text-center m-5">This meeting is in the past.</h2>
  }

  if (!slots) {
    return <h2 className="text-center m-5">There are no free slots available for this meeting.</h2>
  }

  if (!selectedDay) {
    return <Skeleton count={10} />
  }

  const onDateChange = (selectedDay: Date | null) => {
    setSelectedTimeSlot(undefined)
    if (selectedDay) {
      setSelectedDay(selectedDay)
    }
  }

  const onSubmit = async () => {
    if (!selectedTimeSlot || selectedTimeSlot.start < new Date()) {
      setMessage("Please select a time slot. The time slot must be in the future.")
      return
    }
    const parseResult = BookingInput.safeParse({
      email,
      notificationTime,
    })

    if (!parseResult.success) {
      setMessage(parseResult.error.errors[0].message)
      return
    }

    try {
      await bookAppointment({
        meetingId: meeting.id,
        inviteeEmail: email,
        startDate: selectedTimeSlot.start,
        notificationTime: notificationTime,
        baseUrl: getOrigin(),
      })
      setSuccess(true)
    } catch (e) {
      setError({ error: true, message: e.message })
    }
  }

  return (
    <>
      <div className="container">
        <div className="text-center mt-5">
          <h3>Schedule an Appointment</h3>
          <p className="pb-3">Select a timeslot of your preference</p>
          <Card className="text-left p-3">
            <Row className="pb-3">
              <Col md={6} className="pb-5">
                <h4>{meeting.name.charAt(0).toUpperCase() + meeting.name.slice(1)}</h4>
                <p>Description: {meeting.description}</p>
                <p>Location: {meeting.location}</p>
                <hr></hr>
                {user ? (
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Only display dates where I am available"
                      value={String(hideOccupied)}
                      onClick={() => setHideOccupied(!hideOccupied)}
                    />
                  </Form>
                ) : (
                  <p>
                    <Link href="/login">Login</Link> to only display dates, where you are available!
                  </p>
                )}
                <DatePickerCalendar
                  date={selectedDay}
                  onDateChange={onDateChange}
                  locale={enUS}
                  modifiers={{
                    disabled: (date) => {
                      const isDateAvailable = slots.some(
                        (slot) => areDatesOnSameDay(slot.start, date) && slot.start > new Date()
                      )
                      return !isDateAvailable
                    },
                  }}
                />
              </Col>
              <Col md={6}>
                <div style={{ maxHeight: "60vh", minHeight: "400px", overflowY: "scroll" }}>
                  <AvailableTimeSlotsSelection
                    slots={slots}
                    selectedDay={selectedDay}
                    selectedTimeSlot={selectedTimeSlot}
                    setSelectedTimeSlot={setSelectedTimeSlot}
                  />
                </div>
              </Col>
            </Row>
            <div className="p-3 d-flex justify-content-end">
              <Button variant="primary" onClick={() => setModalVisible(true)}>
                Schedule!
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Modal
        show={modalVisible}
        onHide={() => {
          setError({ error: false, message: "" })
          setMessage("")
          setSuccess(false)
          setModalVisible(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Finish your booking.</Modal.Title>
        </Modal.Header>
        {!error.error && !success && (
          <Modal.Body>
            {selectedTimeSlot && (
              <p>
                You are booking the slot {formatAs24HourClockString(selectedTimeSlot.start)}-
                {formatAs24HourClockString(selectedTimeSlot.end)}.
              </p>
            )}
            You will receive a confirmation mail to this adress
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    setEmail(e.currentTarget.value)
                  }
                />
              </Form.Group>
              <Form.Group controlId="formNotificationTime">
                <Form.Label>
                  Select how many minutes before the appointment you want to be notified:
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="30min"
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    setNotificationTime(Number(e.currentTarget.value))
                  }
                />
              </Form.Group>
              <Form.Text className="text-danger mb-4">{message}</Form.Text>
            </Form>
            <Button variant="primary" onClick={() => onSubmit()} id="submit">
              Submit!
            </Button>
          </Modal.Body>
        )}
        {error.error && (
          <Alert variant="danger">
            Something went wrong: {error.message} Please edit your data and try again.
          </Alert>
        )}
        {success && (
          <Alert variant="success">
            The slot has been booked! You will receive a confirmation e-mail with all details. You
            can close this website now.
          </Alert>
        )}
      </Modal>
    </>
  )
}

const ScheduleAppointment: BlitzPage = () => {
  const slug = useParam("slug", "string")
  const username = useParam("username", "string")

  if (!slug || !username) {
    return <Skeleton count={10} />
  }

  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <Scheduler meetingSlug={slug} username={username} />
    </Suspense>
  )
}

export default ScheduleAppointment
