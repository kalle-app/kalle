import { BlitzPage } from "blitz"
import React, { Suspense, useState } from "react"
import Advanced from "../../components/creationSteps/advanced"
import Availability from "../../components/creationSteps/availability"
import General from "../../components/creationSteps/general"
import Schedule from "../../components/creationSteps/schedule"

enum Steps {
  General,
  Schedule,
  Availability,
  Advanced,
}

const initialMeeting = {
  name: "",
  link: "",
  description: "",
  timezone: 0,
  startDate: "",
  endDate: "",
  timeslots: [],
  schedule: {
    monday: [],
    tuesday: [],
    wendsday: [],
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

  const onMeetingEdited = (key, value) => {
    if (key === "timeslots") {
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

  const renderSwitch = () => {
    switch (step) {
      case Steps.General:
        return <General toNext={next} onEdit={onMeetingEdited} />
      case Steps.Schedule:
        return <Schedule toNext={next} stepBack={stepBack} onEdit={onMeetingEdited} />
      case Steps.Availability:
        return <Availability toNext={next} stepBack={stepBack} onEdit={onMeetingEdited} />
      case Steps.Advanced:
        return <Advanced stepBack={stepBack} onEdit={onMeetingEdited} />
    }
  }

  const next = () => {
    if (step !== stepOrder[stepOrder.length - 1]) {
      const cur = stepOrder.indexOf(step)
      setStep(stepOrder[cur + 1])
    }
  }

  const stepBack = (lastStep: Steps) => {
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
