type SlotProps = {
  start: string
  end: string
}

const SingleTimeSlot = (props: SlotProps) => {
  return (
    <div className="p-2 m-1 border border-gray-200 col-span-full">
      <p>{props.start}-</p>
      <p>{props.end}</p>
    </div>
  )
}

export default SingleTimeSlot
