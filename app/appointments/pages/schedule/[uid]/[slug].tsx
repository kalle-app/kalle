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
import { Slot } from "app/appointments/types"

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

  const onChange = (selectedDay: Date | null) => {
    if(selectedDay) {
      setSelectedTimeSlot({ start: null, end: null })
      setSelectedDay(selectedDay)
    }
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
    const sameDay = (slot: Slot) => datesAreOnSameDay(slot["start"], date)
    return slots.some(sameDay)
  }

  const datesAreOnSameDay = (first: Date, second: Date) => {
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
            <div className="p-4 col-span-full lg:col-span-1 md:border-right md:border-r-2 md:border-gray-200">
              <h1 className="text-xl font-medium">
                {meeting.name.charAt(0).toUpperCase() + meeting.name.slice(1)}
              </h1>
              <p>{meeting.description}</p>
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
          <div className="rounded-md shadow">
            <a
              href="#"
              onClick={() => onSubmit()}
              className="w-1 m-4 flex float-right items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Submit
            </a>
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
