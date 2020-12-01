type MyMeetingsProps = {
  meetings?: any[]
}

const MyMeetings = (props: MyMeetingsProps) => {
  return (
    <div className="container">
      {props.meetings?.map((meeting) => {
        return <h3>{meeting.name}</h3>
      })}
    </div>
  )
}

export default MyMeetings
