import { BlitzPage, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import getAvailableSlots from "../queries/getAvailableSlots"

const Scheduler = () => {
  const [availableSlots, { refetch }] = useQuery(getAvailableSlots, null)
  const [selected, setSelected] = useState()

  const onSubmit = (e: any) => {
    // Send selected to calendar owner
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
          <div className="grid grid-cols-3 gap-6">
            <div className="flex p-4 col-span-1  border-right border-r-2 border-gray-200">
              <div>Title, Description and other general stuff here</div>
            </div>
            <div className="flex col-span-2">
              <div>
                calendar here with data with free slots highlighted. On click on date show available
                slots
              </div>
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
