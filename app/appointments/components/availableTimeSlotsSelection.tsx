import { areDatesOnSameDay } from "app/time-utils/comparison"
import { TimeSlot } from "../types"
import SingleTimeSlot from "./singleTimeSlot"
import timezones from "app/meetings/components/schedules/tz"
import { useState } from "react"
import { SearchableDropdown } from "app/components/SearchableDropdown"

interface AvailableSlotsProps {
  slots: TimeSlot[]
  selectedDay?: Date
  setSelectedTimeSlot(v: TimeSlot): void
  selectedTimeSlot?: TimeSlot
}

const AvailableTimeSlotsSelection = (props: AvailableSlotsProps) => {
  const [timeZone, setTimeZone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const { slots, selectedDay } = props
  const selectedSlots = selectedDay
    ? slots.filter((slot) => areDatesOnSameDay(slot.start, selectedDay) && slot.start > new Date())
    : []

  return (
    <div className="text-center">
      <p className="mb-4">Please select a time slot.</p>
      <div className="d-flex justify-content-center">
        <p>Time zone is set to &nbsp;</p>
        <SearchableDropdown
          description="Change time zone"
          options={timezones}
          onSelect={setTimeZone}
          value={timeZone}
        />
      </div>
      <ul>
        {selectedSlots.map((slot, index) => (
          <li key={index} className="w-full d-flex justify-content-center">
            <SingleTimeSlot
              start={slot.start}
              end={slot.end}
              selectedTimeSlot={props.selectedTimeSlot}
              setSelectedTimeSlot={props.setSelectedTimeSlot}
              timezone={timeZone}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AvailableTimeSlotsSelection
