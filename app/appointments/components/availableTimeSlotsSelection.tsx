import { Slot } from "../types"
import SingleTimeSlot from "./singleTimeSlot"

type AvailableSlotsProps = {
  slots: Slot[]
  selectedDay: Date
}

const AvailableTimeSlotsSelection = (props: AvailableSlotsProps) => {
  const getTimeString = (date) => {
    return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
  }

  const timeSlotTiles = props.slots.map((slot) => {
    if (
      props.selectedDay.getDate() === slot.start.getDate() &&
      props.selectedDay.getFullYear() === slot.start.getFullYear()
    ) {
      return <SingleTimeSlot start={getTimeString(slot.start)} end={getTimeString(slot.end)} />
    }
  })

  return (
    <>
      <p className="text-center col-span-full">Please select a time slot.</p>
      <br />
      {timeSlotTiles}
    </>
  )
}

export default AvailableTimeSlotsSelection
