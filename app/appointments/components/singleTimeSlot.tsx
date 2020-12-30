import { areDatesEqual } from "app/time-utils/comparison"
import { formatAs24HourClockString } from "app/time-utils/format"
import Button from "react-bootstrap/Button"
import { TimeSlot } from "../types"

interface SingleTimeSlotProps {
  start: Date
  end: Date
  setSelectedTimeSlot(v: TimeSlot): void
  selectedTimeSlot?: TimeSlot
}

const SingleTimeSlot = (props: SingleTimeSlotProps) => {
  const { start, end, setSelectedTimeSlot, selectedTimeSlot } = props

  const isSelected = !!selectedTimeSlot?.start && areDatesEqual(selectedTimeSlot.start, start)

  return (
    <Button
      variant="outline-secondary"
      className={"w-50 m-1 " + (isSelected ? "active" : "")}
      onClick={() => {
        setSelectedTimeSlot({ start, end })
      }}
    >
      {formatAs24HourClockString(start)}-{formatAs24HourClockString(end)}
    </Button>
  )
}

export default SingleTimeSlot
