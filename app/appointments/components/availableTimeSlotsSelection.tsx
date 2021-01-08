import { areDatesOnSameDay } from "app/time-utils/comparison"
import { TimeSlot } from "../types"
import SingleTimeSlot from "./singleTimeSlot"

interface AvailableSlotsProps {
  slots: TimeSlot[]
  selectedDay?: Date
  setSelectedTimeSlot(v: TimeSlot): void
  selectedTimeSlot?: TimeSlot
}

const AvailableTimeSlotsSelection = (props: AvailableSlotsProps) => {
  const { slots, selectedDay } = props
  const selectedSlots = selectedDay
    ? slots.filter((slot) => areDatesOnSameDay(slot.start, selectedDay))
    : []

  return (
    <div className="text-center">
      <p className="mb-4">Please select a time slot.</p>
      <ul>
        {selectedSlots.map((slot, index) => (
          <li key={index} className="w-full d-flex justify-content-center">
            <SingleTimeSlot
              start={slot.start}
              end={slot.end}
              selectedTimeSlot={props.selectedTimeSlot}
              setSelectedTimeSlot={props.setSelectedTimeSlot}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AvailableTimeSlotsSelection
