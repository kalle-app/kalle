import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"

interface SlotProps {
  start: string
  end: string
  setSelectedTimeSlot: any
  selectedTimeSlot: any
}

const SingleTimeSlot = (props: SlotProps) => {
  return (
    <Button
      variant="outline-secondary"
      className={"w-50 m-1 " + (props.selectedTimeSlot?.start === props.start ? "active" : "")}
      onClick={(e) => {
        props.setSelectedTimeSlot({ start: props.start, end: props.end })
      }}
    >
      {props.start}-{props.end}
    </Button>
  )
}

export default SingleTimeSlot
