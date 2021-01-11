import AvailableTimeSlotsSelection from "app/appointments/components/availableTimeSlotsSelection"
import getMeeting from "app/appointments/queries/getMeeting"
import React, { Suspense, useEffect, useState } from "react"
import { BlitzPage, useQuery, useParam, useMutation } from "blitz"
import { DatePickerCalendar } from "react-nice-dates"
import "react-nice-dates/build/style.css"
import { enUS } from "date-fns/locale"
import getTimeSlots from "app/appointments/queries/getTimeSlots"
import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap"
import type { TimeSlot } from "app/appointments/types"
import { areDatesOnSameDay } from "app/time-utils/comparison"
import Skeleton from "react-loading-skeleton"
import bookAppointmentMutation from "app/appointments/mutations/bookAppointment"

interface SchedulerProps {
  meetingSlug: string
  username: string
}

const Scheduler: React.FunctionComponent<SchedulerProps> = ({ meetingSlug, username }) => {
  const [meeting] = useQuery(getMeeting, { username: username, slug: meetingSlug })
  const [selectedDay, setSelectedDay] = useState<Date>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>()
  const [bookAppointment] = useMutation(bookAppointmentMutation)
  const [email, setEmail] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const [slots] = useQuery(getTimeSlots, { meetingSlug: meetingSlug, ownerName: username })

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
  }, [slots, setSelectedDay])

  if (!meeting) {
    return <h2 className="text-center m-5">Meeting invalid :(</h2>
  }

  if (!slots) {
    return <h2 className="text-center m-5">No free slots available :(</h2>
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
    if (!selectedTimeSlot) {
      alert("No timeslot selected")
      return
    }

    if (!email) {
      alert("Email not set")
      return
    }

    await bookAppointment({
      meeting: meeting,
      meetingOwnerName: username,
      inviteeEmail: email,
      startDate: selectedTimeSlot.start,
    })
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
                <DatePickerCalendar
                  date={selectedDay}
                  onDateChange={onDateChange}
                  locale={enUS}
                  modifiers={{
                    disabled: (date) => {
                      const isDateAvailable = slots.some((slot) =>
                        areDatesOnSameDay(slot.start, date)
                      )
                      return !isDateAvailable
                    },
                  }}
                />
              </Col>
              <Col md={6}>
                <AvailableTimeSlotsSelection
                  slots={slots}
                  selectedDay={selectedDay}
                  selectedTimeSlot={selectedTimeSlot}
                  setSelectedTimeSlot={setSelectedTimeSlot}
                />
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
      <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your Emailadress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You will receive a confirmation mail to this adress
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={() => onSubmit()} id="submit">
            Submit!
          </Button>
        </Modal.Body>
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
