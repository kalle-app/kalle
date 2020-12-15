interface SlotProps {
  start: string
  end: string
  setSelectedTimeSlot: any
  selectedTimeSlot: any
}

const SingleTimeSlot = (props: SlotProps) => {
  return (
    <button
      className={
        "w-full p-2 m-1 border border-gray-200 col-span-full bg-gray-200 rounded-md hover:bg-gray-400" +
        (props.selectedTimeSlot?.start === props.start ? " bg-gray-600 text-white" : null)
      }
      onClick={(e) => {
        props.setSelectedTimeSlot({ start: props.start, end: props.end })
      }}
    >
      {props.start}-{props.end}
    </button>
  )
}

export default SingleTimeSlot
