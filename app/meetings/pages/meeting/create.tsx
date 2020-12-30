import { BlitzPage, Router, useMutation } from "blitz"
import React, { ReactElement, Suspense, useState } from "react"
import Advanced from "../../components/creationSteps/Advanced"
import Availability from "../../components/creationSteps/Availability"
import General from "../../components/creationSteps/General"
import Schedule from "../../components/creationSteps/Schedule"
import { Meeting } from "app/meetings/types"
import addMeetingMutation from "../../mutations/addMeeting"
import Layout from "app/layouts/Layout"
import Card from "react-bootstrap/Card"
import { Button, Modal } from "react-bootstrap"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { getOrigin } from "utils/generalUtils"

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

interface SuccessModalProps {
  show: boolean
  setShow: (val: boolean) => void
  meetingLink: string
}

const SuccessModal = (props: SuccessModalProps): ReactElement => {
  const close = () => {
    props.setShow(false)
    Router.push(`/meetings`)
  }
  return (
    <Modal show={props.show} onHide={() => close()}>
      <Modal.Header closeButton>
        <Modal.Title>Meeting successfully creted!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your invitelink is: {props.meetingLink}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => close()}>
          Close
        </Button>
        <CopyToClipboard text={props.meetingLink}>
          <Button variant="primary" onClick={() => close()}>
            Copy to Clipboard
          </Button>
        </CopyToClipboard>
      </Modal.Footer>
    </Modal>
  )
}

const InviteCreationContent = () => {
  const [step, setStep] = useState(Steps.General)

  const [meeting, setMeeting] = useState(initialMeeting)
  const [meetingLink, setMeetingLink] = useState("")
  const [showSuccess, setShow] = useState(false)
  const [createMeeting] = useMutation(addMeetingMutation)

  const submitMeeting = async () => {
    try {
      const data = await createMeeting(meeting)
      const link = getOrigin() + "schedule/" + data?.ownerId + "/" + data?.link
      setMeetingLink(link)
      setShow(true)
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
                name: result.name,
                description: result.description,
                link: result.link,
              }))

              next()
            }}
          />
        )
      case Steps.Schedule:
        return (
          <Schedule
            toNext={(result) => {
              setMeeting((oldMeeting) => ({
                ...oldMeeting,
                startDate: result.startDate,
                endDate: result.endDate,
                schedule: result.schedule,
                timezone: result.timezone,
              }))
              next()
            }}
            stepBack={stepBack}
          />
        )
      case Steps.Availability:
        return <Availability toNext={next} stepBack={stepBack} />
      case Steps.Advanced:
        return <Advanced onSubmit={submitMeeting} stepBack={stepBack} />
    }
  }

  return (
    <>
      <Card>{renderSwitch()}</Card>
      <SuccessModal show={showSuccess} setShow={setShow} meetingLink={meetingLink} />
    </>
  )
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
