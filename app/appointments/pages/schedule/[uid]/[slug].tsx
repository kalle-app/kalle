import AvailableTimeSlotsSelection from "app/appointments/components/availableTimeSlotsSelection"
import getMeeting from "app/appointments/queries/getMeeting"
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

const Scheduler: React.FunctionComponent<SchedulerProps> = ({ meetingSlug, uid }) => {
  const [meeting] = useQuery(getMeeting, meetingSlug)
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>()
  const [slots] = useQuery(getTimeSlots, { meetingSlug: meetingSlug, calendarOwner: uid })

  if (!meeting) {
    return <p>Meeting invalid :(</p>
  }

  if (!slots) {
    return <p>No free slots available :(</p>
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

    invoke(sendConfirmationMail, {
      appointment: {
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
      },
    })
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

  if (!slug || !uid) {
    return <h3>Meeting not found</h3>
  }

  return (
    <Suspense fallback="Loading...">
      <Scheduler meetingSlug={slug} uid={uid} />
    </Suspense>
  )
}

export default ScheduleAppointment
