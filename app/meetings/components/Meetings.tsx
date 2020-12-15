import { Meeting } from "@prisma/client"
import Card from "app/components/Card"

type MeetingsProps = {
  meetings?: Meeting[]
}

const Meetings = (props: MeetingsProps) => {
  if (!props.meetings || props.meetings?.length < 1) {
    return <p>No Meetings available</p>
  }

  return (
    <>
      {props.meetings.map((meeting) => {
        const end = meeting.endDate.toString()
        const start = meeting.startDate.toString()
        const href = "www.kalle.app/schedule/".concat(String(meeting.ownerId), "/", meeting.link)
        return (
          <div className="container mt-5 mb-5">
            <Card key={meeting.id + meeting.ownerId + meeting.name}>
              <h3>{meeting.name}</h3>
              <p>{meeting.description}</p>
              <p>Duration: {meeting.duration} Minutes</p>
              <p>
                Between {start} and {end}
              </p>
              <p>
                Invite anyone with the link &nbsp;
                <a className="font-bold" href={href}>
                  {href}
                </a>
              </p>
            </Card>
          </div>
        )
      })}
    </>
  )
}

export default Meetings
