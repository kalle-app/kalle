import { BlitzPage, useMutation } from "blitz"
import React, { Suspense, useState } from "react"
import Advanced from "../../components/creationSteps/advanced"
import Availability from "../../components/creationSteps/availability"
import General from "../../components/creationSteps/general"
import Schedule from "../../components/creationSteps/schedule"
import { Meeting } from "app/meetings/types"
import addConnectedCalendar from "../../../users/mutations/addConnectedCalendar"
import addMeeting from "../../mutations/addMeeting"
import { router } from "next/client"

enum Steps {
  General,
  Schedule,
  Availability,
  Advanced,
}

const initialMeeting: Meeting = {
  name: "",
  link: "",
  description: "",
  duration: 15,
  timezone: 0,
  startDate: new Date(),
  endDate: new Date(),
  timeslots: [],
  schedule: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
}

const InviteCreationContent = () => {
  const [step, setStep] = useState(Steps.General)
  const stepOrder = [Steps.General, Steps.Schedule, Steps.Availability, Steps.Advanced]
  const [meeting, setMeeting] = useState(initialMeeting)
  const [createMeetingMutation] = useMutation(addMeeting)

  const onMeetingEdited = (key, value) => {
    if (key === "schedule") {
      const position = value.type === "start" ? 0 : 1
      const newSchedule = meeting.schedule
      newSchedule[value.day][position] = value.value
      setMeeting({
        ...meeting,
        schedule: newSchedule,
      })
    } else if (key === "timeslots") {
      setMeeting({
        ...meeting,
        timeslots: meeting.timeslots.concat(value),
      })
    } else {
      setMeeting({
        ...meeting,
        [key]: value,
      })
    }
  }

  const submitMeeting = (e: any) => {
    createMeetingMutation(meeting)
      .then((data) => {
        // Redirect to All Meetings
      })
      .catch((error) => {
        alert(error)
      })
  }

  const renderSwitch = () => {
    switch (step) {
      case Steps.General:
        return <General meeting={meeting} toNext={next} onEdit={onMeetingEdited} />
      case Steps.Schedule:
        return (
          <Schedule meeting={meeting} toNext={next} stepBack={stepBack} onEdit={onMeetingEdited} />
        )
      case Steps.Availability:
        return <Availability toNext={next} stepBack={stepBack} onEdit={onMeetingEdited} />
      case Steps.Advanced:
        return <Advanced onSubmit={submitMeeting} stepBack={stepBack} onEdit={onMeetingEdited} />
    }
  }

  const next = () => {
    if (step !== stepOrder[stepOrder.length - 1]) {
      const cur = stepOrder.indexOf(step)
      setStep(stepOrder[cur + 1])
    }
  }

  const stepBack = () => {
    if (step !== stepOrder[0]) {
      const cur = stepOrder.indexOf(step)
      setStep(stepOrder[cur - 1])
    }
  }
  return <div className="bg-white shadow overflow-hidden sm:rounded-lg">{renderSwitch()}</div>
}

const Create: BlitzPage = () => {
  return (
    <div className="bg-gray-100 flex h-screen">
      <div className="container flex flex-col justify-center mx-auto">
        <Suspense fallback="Loading...">
          <InviteCreationContent />
        </Suspense>
      </div>
    </div>
  )
}

export default Create
