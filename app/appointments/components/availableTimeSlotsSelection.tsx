import { Slot } from "../types"
import SingleTimeSlot from "./singleTimeSlot"

interface AvailableSlotsProps {
  slots: Slot[]
  selectedDay: Date
  setSelectedTimeSlot: any
  selectedTimeSlot: any
}

const AvailableTimeSlotsSelection = (props: AvailableSlotsProps) => {
  const getTimeString = (date) => {
    return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
  }

  const timeSlotTiles = props.slots.map((slot, index) => {
    if (
      props.selectedDay.getDate() === slot.start.getDate() &&
      props.selectedDay.getFullYear() === slot.start.getFullYear()
    ) {
      return (
        <SingleTimeSlot
          key={index}
          start={getTimeString(slot.start)}
          end={getTimeString(slot.end)}
          selectedTimeSlot={props.selectedTimeSlot}
          setSelectedTimeSlot={props.setSelectedTimeSlot}
        />
      )
    }
  })

  return (
    <div className="flex-col w-full">
      <p>Please select a time slot.</p>
      {timeSlotTiles}
    </div>
  )
}

export default AvailableTimeSlotsSelection
