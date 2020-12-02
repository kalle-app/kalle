import { BlitzPage, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import Calendar from "react-calendar"
import getAvailableSlots from "../queries/getAvailableSlots"

const Scheduler = () => {
  const [availableSlots, { refetch }] = useQuery(getAvailableSlots, null)
  const [selected, setSelected] = useState()

  const [selectedDay, setSelectedDay] = useState(new Date());

  const onChange = (selectDay, event) => {
    setSelectedDay(selectDay)
    console.log("Test")
    //todo show timeslots for day
  }

  const onSubmit = (e: any) => {
    // Send selected to calendar owner
  }
  console.log("availableSlots: ", availableSlots);
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
  const slots = [{"start": start, "end": end},{"start": start1, "end": end1},
                {"start": start2, "end": end2},{"start": startn, "end": endn},
                {"start": start1n, "end": end1n}, {"start": start2n, "end": end2n}]

  const AvailableTimeSlotsSelection = () => {

    function getTimeString(date){
      return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
    }

    const timeSlotTiles = slots.map(slot => {
      if (selectedDay.getDate() == slot.start.getDate() && selectedDay.getFullYear() == slot.start.getFullYear()) {
        return (
          <SingleTimeSlot
            start={getTimeString(slot.start)}
            end={getTimeString(slot.end)}
          />
        )
      }
    })

    return(
      <>
      <p className="text-center col-span-full">
        Please select a time slot.
      </p>
      <br/>
      {timeSlotTiles}
      </>
    )
  }

  const SingleTimeSlot = ({start, end}) => {
    return(
      <div className="p-2 m-1 border border-gray-200 col-span-full">
        <p>{start}-</p>
        <p>{end}</p>
      </div>
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
            <div className="flex p-4 col-span-full lg:col-span-1">
              <Calendar
                onChange={onChange}
                value={selectedDay}
                maxDetail={"month"}
                minDetail={"month"}
                tileClassName={({ class1, date}) => date.getDay() === 3 ? true : false}
              />
            </div>
            <div className="flex p-4 col-span-full lg:col-span-1">
              <AvailableTimeSlotsSelection/>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ScheduleAppointment: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Scheduler />
    </Suspense>
  )
}

export default ScheduleAppointment
