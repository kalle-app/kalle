import { BlitzPage, Router, useMutation, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import { Meeting } from "app/meetings/types"
import addMeeting from "../../mutations/addMeeting"
import Layout from "app/layouts/Layout"
import Card from "react-bootstrap/Card"
import getSchedules from "app/meetings/queries/getSchedules"
import GeneralStep from "../../components/creationSteps/General"
import ScheduleStep from "../../components/creationSteps/Schedule"
import AvailabilityStep from "../../components/creationSteps/Availability"
import AdvancedStep from "../../components/creationSteps/Advanced"

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
  scheduleId: 0,
}

const InviteCreationContent = () => {
  const [step, setStep] = useState(Steps.General)
  const stepOrder = [Steps.General, Steps.Schedule, Steps.Availability, Steps.Advanced]
  const [meeting, setMeeting] = useState(initialMeeting)
  const [schedules] = useQuery(getSchedules, null)
  const [createMeetingMutation] = useMutation(addMeeting)

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

  const submitMeeting = () => {
    createMeetingMutation(meeting)
      .then((data) => {
        Router.push("/meetings")
        const meetingLink = data?.ownerId + "/" + data?.link
        alert("Meeting succesfully created. Your Meetinglink is: " + meetingLink)
      })
      .catch((error) => {
        alert(error)
      })
  }

  const renderSwitch = () => {
    switch (step) {
      case Steps.General:
        return <GeneralStep meeting={meeting} toNext={next} onEdit={onMeetingEdited} />
      case Steps.Schedule:
        return (
          <ScheduleStep
            meeting={meeting}
            toNext={next}
            schedulePresets={schedules!}
            stepBack={stepBack}
            onEdit={onMeetingEdited}
          />
        )
      case Steps.Availability:
        return <AvailabilityStep toNext={next} stepBack={stepBack} onEdit={onMeetingEdited} />
      case Steps.Advanced:
        return (
          <AdvancedStep onSubmit={submitMeeting} stepBack={stepBack} onEdit={onMeetingEdited} />
        )
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
