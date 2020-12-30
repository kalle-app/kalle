import AvailableTimeSlotsSelection from "app/appointments/components/availableTimeSlotsSelection"
import getMeeting from "app/appointments/queries/getMeeting"
import getConnectedCalendars from "app/appointments/queries/getConnectedCalendars"
import { BlitzPage, useQuery, useParam, invoke } from "blitz"
import React, { Suspense, useState } from "react"
import { DatePickerCalendar } from "react-nice-dates"
import "react-nice-dates/build/style.css"
import { enUS } from "date-fns/locale"
import getTimeSlots from "app/appointments/queries/getTimeSlots"
import sendConfirmationMail from "app/components/createEmail/queries/sendConfirmationMail"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Form, Modal } from "react-bootstrap"

interface SchedulerProps {
  meetingSlug: string
  uid: string
}

const Scheduler = ({ meetingSlug, uid }: SchedulerProps) => {
  const [meeting] = useQuery(getMeeting, meetingSlug)
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    start: string | null
    end: string | null
  }>({ start: null, end: null })
  const [connectedCalendars] = useQuery(getConnectedCalendars, meeting!.ownerId)
  const [email, setEmail] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  if (!(connectedCalendars && connectedCalendars[0])) {
    alert("No calendar connected :(")
    throw new Error("No Calendar connected!")
  }

  if (!meeting) {
    alert("Meeting invalid :(")
    throw new Error("Meeting is invalid!")
  }

  const [slots] = useQuery(getTimeSlots, { meetingSlug: meetingSlug, calendarOwner: uid })
  if (!slots) {
    alert("No free slots available :(")
    throw new Error("No free slots available")
  }

  const onChange = (selectedDay) => {
    setSelectedTimeSlot({ start: null, end: null })
    setSelectedDay(selectedDay)
  }

  const onSubmit = () => {
    if (!selectedTimeSlot || !selectedTimeSlot.start || !selectedDay) {
      alert("No timeslot selected")
      return
    }

    const hour = selectedTimeSlot.start.split(":")[0]
    const minute = selectedTimeSlot.start.split(":")[1]
    if (!hour || !minute) {
      alert("Invalid Time give")
      return
    }

    const appointment = {
      start: {
        year: selectedDay.getFullYear(),
        month: selectedDay.getMonth() + 1,
        day: selectedDay.getDate(),
        hour: Number(hour),
        minute: Number(minute),
      },
      duration: {
        hours: Math.floor(meeting.duration / 60),
        minutes: meeting.duration % 60,
      },
      title: meeting.name,
      description: meeting.description ? meeting.description : "No Description set",
      method: "request",
      location: "Berlin",
      url: "www.kalle.app",
      organiser: {
        name: "Kalle app",
        email: "info@kalle.app",
      },
      owner: {
        name: email.split("@")[0],
        email: email,
      },
    }
    setModalVisible(false)
    invoke(sendConfirmationMail, { appointment: appointment })
  }

  const modifiers = {
    disabled: (date) => !is_day_available(date),
  }

  const is_day_available = (date) => {
    const sameDay = (slot) => datesAreOnSameDay(slot["start"], date)
    return slots.some(sameDay)
  }

  const datesAreOnSameDay = (first, second) => {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    )
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
                <p>{meeting.description}</p>
                <DatePickerCalendar
                  date={selectedDay}
                  onDateChange={onChange}
                  locale={enUS}
                  modifiers={modifiers}
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
          <Button variant="primary" onClick={() => onSubmit()}>
            Submit!
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

const ScheduleAppointment: BlitzPage = () => {
  const slug = useParam("slug", "string")
  const uid = useParam("uid", "string")

  if (slug && uid) {
    return (
      <Suspense fallback="Loading...">
        <Scheduler meetingSlug={slug} uid={uid} />
      </Suspense>
    )
  }

  return <h3>Meeting not found</h3>
}

export default ScheduleAppointment
