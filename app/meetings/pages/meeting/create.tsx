import { BlitzPage, Router, useMutation } from "blitz"
import React, { Suspense, useState } from "react"
import Advanced from "../../components/creationSteps/Advanced"
import Availability from "../../components/creationSteps/Availability"
import General from "../../components/creationSteps/General"
import Schedule from "../../components/creationSteps/Schedule"
import { Meeting } from "app/meetings/types"
import addMeetingMutation from "../../mutations/addMeeting"
import Layout from "app/layouts/Layout"
import Card from "react-bootstrap/Card"

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
    monday: ["9:00", "17:00"],
    tuesday: ["9:00", "17:00"],
    wednesday: ["9:00", "17:00"],
    thursday: ["9:00", "17:00"],
    friday: ["9:00", "17:00"],
    saturday: ["", ""],
    sunday: ["", ""],
  },
}

const InviteCreationContent = () => {
  const [step, setStep] = useState(Steps.General)

  const [meeting, setMeeting] = useState(initialMeeting)
  const [createMeeting] = useMutation(addMeetingMutation)

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

  const submitMeeting = async () => {
    try {
      const data = await createMeeting(meeting)
      Router.push(`/meetings#${data.id}`)
    } catch (error) {
      alert(error)
    }
  }

  const next = () => {
    setStep((oldStep) => oldStep + 1)
  }

  const stepBack = () => {
    setStep((oldStep) => oldStep - 1)
  }

  const renderSwitch = () => {
    switch (step) {
      case Steps.General:
        return (
          <General
            toNext={(result) => {
              setMeeting((oldMeeting) => ({
                ...oldMeeting,
                ...result,
              }))

              next()
            }}
          />
        )
      case Steps.Schedule:
        return (
          <Schedule meeting={meeting} toNext={next} stepBack={stepBack} onEdit={onMeetingEdited} />
        )
      case Steps.Availability:
        return <Availability toNext={next} stepBack={stepBack} />
      case Steps.Advanced:
        return <Advanced onSubmit={submitMeeting} stepBack={stepBack} />
    }
  }

  return <Card>{renderSwitch()}</Card>
}

const Create: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <InviteCreationContent />
    </Suspense>
  )
}

Create.getLayout = (page) => <Layout title="Create a Meeting">{page}</Layout>

export default Create
