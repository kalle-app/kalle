import { ConnectedCalendar, Meeting } from "@prisma/client"
import AvailableTimeSlotsSelection from "app/appointments/components/availableTimeSlotsSelection"
import getMeeting from "app/appointments/queries/getMeeting"
import getConnectedCalendars from "app/appointments/queries/getConnectedCalendars"
import { BlitzPage, useQuery, useParam } from "blitz"
import React, { Suspense, useState } from "react"
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import getTimeSlots from "app/appointments/queries/getTimeSlots"

interface SchedulerProps {
  meetingSlug: string
  uid: string
}
// Dummy Data
const dailySchedule = [
  { day: "monday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "tuesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "wednesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "thursday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "friday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
]

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
// const slots = slotsMock

const Scheduler = ({ meetingSlug, uid }: SchedulerProps) => {
  const [meeting] = useQuery(getMeeting, meetingSlug)
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({ start: null, end: null })
  const [connectedCalendars] = useQuery(getConnectedCalendars, meeting!.ownerId)  

  if (!(connectedCalendars && connectedCalendars[0])) {
    throw new Error("No Calendar connected!")
  }

  if (!meeting) {
    throw new Error("Meeting is invalid!")
  }

  const slots = useQuery(getTimeSlots, {meetingSlug: meetingSlug, calendarOwner: uid})

  const onChange = (selectedDay) => {
    setSelectedTimeSlot({ start: null, end: null })
    setSelectedDay(selectedDay)
  }

  const onSubmit = (e: any) => {
    // Send selected to calendar owner
  }

  const modifiers = {
    disabled: date => !is_day_available(date),
  }

  const is_day_available = (date) => {
    const sameDay = (slot) => datesAreOnSameDay(slot['start'], date)
    return slotsMock.some(sameDay)
  }

  const datesAreOnSameDay = (first, second) => {
    return first.getFullYear() === second.getFullYear() &&
           first.getMonth() === second.getMonth() &&
           first.getDate() === second.getDate()
  }

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
            <div className="p-4 col-span-full lg:col-span-1">
              <DatePickerCalendar 
                date={selectedDay} 
                onDateChange={onChange} 
                locale={enUS}
                modifiers={modifiers}
              />
            </div>
            <div className="flex p-4 col-span-full lg:col-span-1">
              <AvailableTimeSlotsSelection
                slots={slotsMock}
                selectedDay={selectedDay}
                selectedTimeSlot={selectedTimeSlot}
                setSelectedTimeSlot={setSelectedTimeSlot}
              />
            </div>
          </div>
        </div>
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
