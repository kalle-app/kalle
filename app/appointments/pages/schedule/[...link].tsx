import { ConnectedCalendar, Meeting } from "@prisma/client"
import AvailableTimeSlotsSelection from "app/appointments/components/availableTimeSlotsSelection"
import getMeeting from "app/appointments/queries/getMeeting"
import getConnectedCalendars from "app/appointments/queries/getConnectedCalendars"
import { getTakenTimeSlots } from "app/caldav"
import { BlitzPage, useQuery, useParam } from "blitz"
import React, { Suspense, useState } from "react"
import Calendar from "react-calendar"
import { getAvailableSlots } from "app/appointments/utils/getAvailableSlots"

const Scheduler = (meetingLink: any) => {
  const [meeting] = useQuery(getMeeting, meetingLink)
  const [selected, setSelected] = useState()
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [connectedCalendars] = useQuery(getConnectedCalendars, meeting!.ownerId)

  
  if(!(connectedCalendars && connectedCalendars[0])) {
    throw new Error('No Calendar connected!')
  }
  
  if(!meeting) {
    throw new Error('Meeting is invalid!')
  }

  // TODO replace connectedCalendars[0] with merging all connected calendars
  const takenSlots = getTakenTimeSlots(
    {
      url: connectedCalendars[0].caldavAddress,
      auth: {
        username: connectedCalendars[0].username,
        password: connectedCalendars[0].password,
      }
    },
    meeting.startDate,
    meeting.endDate,
  )

  const slots = getAvailableSlots(
    meeting.schedule,
    meeting.duration,
    takenSlots,
  )

  const onChange = (selectDay, event) => {
    setSelectedDay(selectDay)
  }

  const onSubmit = (e: any) => {
    // Send selected to calendar owner
  }

  const start = new Date("2020-11-25T11:00:00.000Z")
  const end = new Date("2020-11-25T13:00:00.000Z")
  const start1 = new Date("2020-11-25T13:00:00.000Z")
  const end1 = new Date("2020-11-25T15:00:00.000Z")
  const start2 = new Date("2020-11-25T15:00:00.000Z")
  const end2 = new Date("2020-11-25T17:00:00.000Z")

  const startn = new Date("2020-11-26T11:00:00.000Z")
  const endn = new Date("2020-11-26T13:00:00.000Z")
  const start1n = new Date("2020-11-26T13:00:00.000Z")
  const end1n = new Date("2020-11-26T15:00:00.000Z")
  const start2n = new Date("2020-11-26T15:00:00.000Z")
  const end2n = new Date("2020-11-26T17:00:00.000Z")
  const slotsMock = [
    { start: start, end: end },
    { start: start1, end: end1 },
    { start: start2, end: end2 },
    { start: startn, end: endn },
    { start: start1n, end: end1n },
    { start: start2n, end: end2n },
  ]

  return (
    <div className="container mx-auto p-4 mt-5">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Schedule an Appointment</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Select a timeslot of your preference
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-full lg:grid-cols-3">
            <div className="flex p-4 col-span-full lg:col-span-1 md:border-right md:border-r-2 md:border-gray-200">
              <div>Title, Description and other general stuff here</div>
            </div>
            <div className="flex p-4 col-span-full lg:col-span-1">
              <Calendar
                onChange={onChange}
                value={selectedDay}
                maxDetail={"month"}
                minDetail={"month"}
                tileClassName={({ class1, date }) => (date.getDay() === 3 ? true : false)}
              />
            </div>
            <div className="flex p-4 col-span-full lg:col-span-1">
              <AvailableTimeSlotsSelection slots={slotsMock} selectedDay={selectedDay} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ScheduleAppointment: BlitzPage = () => {
  const link = useParam("link")

  if (link) {
    return (
      <Suspense fallback="Loading...">
        <Scheduler meetingLink={link} />
      </Suspense>
    )
  }

  return <h3>Meeting not found</h3>
}

export default ScheduleAppointment
