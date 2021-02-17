import AuthError from "app/components/AuthError"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import getScheduleNames from "app/meetings/queries/getScheduleNames"
import { Meeting } from "app/meetings/types"
import { BlitzPage, Router, useMutation, useQuery } from "blitz"
import React, { ReactElement, Suspense, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Skeleton from "react-loading-skeleton"
import { getOrigin } from "utils/generalUtils"
import General from "../../components/creationSteps/General"
import ScheduleStep from "../../components/creationSteps/Schedule"
import addMeetingMutation from "../../mutations/addMeeting"

enum Steps {
  General,
  Schedule,
}

const initialMeeting: Meeting = {
  name: "",
  link: "",
  description: "",
  duration: 15,
  timezone: 0,
  startDate: new Date(),
  endDate: new Date(),
  location: "",
  scheduleId: 0,
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
        <Modal.Title>Meeting successfully created!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your invitelink is: {props.meetingLink}
        <br></br>
        Copy it and send it to your customers or friends
      </Modal.Body>
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

interface ErrorModalProps {
  error: boolean
  message: string
  setError: (val: object) => void
}

const ErrorModal = (props: ErrorModalProps): ReactElement => {
  return (
    <Modal show={props.error} onHide={() => props.setError({ error: false, message: "" })}>
      <Modal.Header closeButton>
        <Modal.Title>Meeting could not be created!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        An error occurred: {props.message}. Please change your input and try it again.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => props.setError({ error: false, message: "" })}>
          Close
        </Button>
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
  const [schedulePresets] = useQuery(getScheduleNames, null)
  const [error, setError] = useState({ error: false, message: "" })
  const [readyForSubmission, setReadyForSubmission] = useState(false)

  useEffect(() => {
    if (readyForSubmission) {
      const submitMeeting = async () => {
        try {
          const data = await createMeeting(meeting)
          const link = getOrigin() + "/schedule/" + data?.ownerName + "/" + data?.link
          setMeetingLink(link)
          setShow(true)
          setReadyForSubmission(false)
        } catch (error) {
          setReadyForSubmission(false)
          setError({ error: true, message: error.message })
        }
      }
      submitMeeting()
    }
  }, [readyForSubmission, meeting, createMeeting])

  if (!useCurrentUser()) {
    return <AuthError />
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
                location: result.location,
                description: result.description,
                link: result.link,
              }))
              next()
            }}
          />
        )
      case Steps.Schedule:
        return (
          <ScheduleStep
            schedulePresets={schedulePresets!}
            onSubmit={(result) => {
              setMeeting((oldMeeting) => ({
                ...oldMeeting,
                startDate: result.startDate,
                endDate: result.endDate,
                scheduleId: result.scheduleId,
                timezone: result.timezone,
                duration: result.duration,
              }))
              setReadyForSubmission(true)
            }}
            stepBack={stepBack}
          />
        )
    }
  }

  return (
    <>
      <Card>{renderSwitch()}</Card>
      <SuccessModal show={showSuccess} setShow={setShow} meetingLink={meetingLink} />
      <ErrorModal error={error.error} message={error.message} setError={setError} />
    </>
  )
}

const Create: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <InviteCreationContent />
    </Suspense>
  )
}

Create.getLayout = (page) => <Layout title="Create a Meeting">{page}</Layout>

export default Create
