import AvailableTimeSlotsSelection from "app/appointments/components/availableTimeSlotsSelection"
import getMeeting from "app/appointments/queries/getMeeting"
import getConnectedCalendars from "app/appointments/queries/getConnectedCalendars"
import { BlitzPage, useQuery, useParam } from "blitz"
import React, { Suspense, useState } from "react"
import { DatePickerCalendar } from "react-nice-dates"
import "react-nice-dates/build/style.css"
import { enUS } from "date-fns/locale"
import getTimeSlots from "app/appointments/queries/getTimeSlots"

interface SchedulerProps {
  meetingSlug: string
  uid: string
}

const Scheduler = ({ meetingSlug, uid }: SchedulerProps) => {
  const [meeting] = useQuery(getMeeting, meetingSlug)
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({ start: null, end: null })
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

  const onChange = (selectedDay) => {
    setSelectedTimeSlot({ start: null, end: null })
    setSelectedDay(selectedDay)
  }

  const onSubmit = (e: any) => {
    // Send selected to calendar owner
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
                slots={slots}
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
