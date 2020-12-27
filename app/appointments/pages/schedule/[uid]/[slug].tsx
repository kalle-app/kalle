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
import { Card, Row, Col, Button } from "react-bootstrap"
import { TimeSlot } from "app/appointments/types"
import { areDatesOnSameDay } from "app/time-utils/comparison"

interface SchedulerProps {
  meetingSlug: string
  uid: string
}

const Scheduler = ({ meetingSlug, uid }: SchedulerProps) => {
  const [meeting] = useQuery(getMeeting, meetingSlug)
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>()
  const [connectedCalendars] = useQuery(getConnectedCalendars, meeting!.ownerId)

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

  const onDateChange = (selectedDay: Date | null) => {
    setSelectedTimeSlot(undefined)
    if (selectedDay) {
      setSelectedDay(selectedDay)
    }
  }

  const onSubmit = () => {
    if (!selectedTimeSlot) {
      alert("No timeslot selected")
      return
    }

    const start = selectedTimeSlot.start

    const appointment = {
      start: {
        year: start.getFullYear(),
        month: start.getMonth() + 1,
        day: start.getDate(),
        hour: start.getHours(),
        minute: start.getMinutes(),
      },
      duration: {
        hours: Math.floor(meeting.duration / 60),
        minutes: meeting.duration % 60,
      },
      title: meeting.name,
      description: meeting.description ? meeting.description : "Description",
      method: "request",
      location: "Berlin",
      url: "www.kalle.app",
      organiser: {
        name: "Kalle app",
        email: "info@kalle.app",
      },
      owner: {
        name: "Rohan Sawahn",
        email: "rohan.sawahn@student.hpi.de",
      },
    }
    console.log(appointment)
    invoke(sendConfirmationMail, { appointment: appointment })
  }

  const modifiers = {
    disabled: (date: Date) => !is_day_available(date),
  }

  const is_day_available = (date: Date) => {
    return slots.some((slot) => areDatesOnSameDay(slot.start, date))
  }

  return (
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
                onDateChange={onDateChange}
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
            <Button variant="primary" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </Card>
      </div>
    </div>
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
