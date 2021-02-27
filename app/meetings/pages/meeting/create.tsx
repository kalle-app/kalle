import AuthError from "app/components/AuthError"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import getScheduleNames from "app/meetings/queries/getScheduleNames"
import { Meeting } from "app/meetings/types"
import { BlitzPage, Link, Router, useMutation, useQuery } from "blitz"
import React, { ReactElement, Suspense, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Skeleton from "react-loading-skeleton"
import hasCalendar from "app/meetings/queries/hasCalendar"
import { getOrigin } from "utils/generalUtils"
import General from "../../components/creationSteps/General"
import ScheduleStep from "../../components/creationSteps/Schedule"
import addMeetingMutation from "../../mutations/addMeeting"
import Advanced from "../../components/creationSteps/Advanced"
import "react-step-progress/dist/index.css"

enum Steps {
  General,
  Schedule,
  Advanced,
}

const initialMeeting: Meeting = {
  name: "",
  link: "",
  description: "",
  duration: 30,
  startDate: new Date(),
  endDate: new Date(),
  location: "",
  scheduleId: 0,
  defaultConnectedCalendarId: -1,
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
  const user = useCurrentUser()
  const [userHasCalendar] = useQuery(hasCalendar, null)

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

  if (!user) {
    return <AuthError />
  }

  if (!userHasCalendar) {
    return (
      <>
        <h3>Whoa someone seems to be in a rush there</h3>
        <h4>... but first things first!</h4>
        <p>
          In order to create a new meeting you should connect a calendar first. So make sure to head
          over to the calendars page and add your personal calendars
        </p>
        <p>
          <b>FAQ: Can't I just create a Meeting without connecting my calendar?</b>
          Sorry this is a feature that is still in work. Currently we need to save appointments to
          your calendar in order to prevent double bookings
        </p>
        <Link href="/calendars">
          <Button variant="primary">To my Calendars</Button>
        </Link>
      </>
    )
  }

  const submitMeeting = async () => {
    try {
      const data = await createMeeting(meeting)
      const link = getOrigin() + "/schedule/" + data?.ownerName + "/" + data?.link
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
            initialMeeting={meeting}
            userName={user.name.replace(/\s+/g, "-")}
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
            initialMeeting={meeting}
            schedulePresets={schedulePresets!}
            toNext={(result) => {
              setMeeting((oldMeeting) => ({
                ...oldMeeting,
                startDate: result.startDate,
                endDate: result.endDate,
                scheduleId: result.scheduleId,
                duration: result.duration,
              }))
              next()
            }}
            stepBack={stepBack}
          />
        )
      case Steps.Advanced:
        return (
          <Advanced
            initialMeeting={meeting}
            onSubmit={(defaultCalendarId) => {
              setMeeting({
                ...meeting,
                defaultConnectedCalendarId: defaultCalendarId,
              })
              setReadyForSubmission(true)
            }}
            stepBack={stepBack}
          />
        )
    }
  }

  const getColor = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: {
        if (step == Steps.Schedule || step == Steps.Advanced) {
          return "stepDone"
        } else {
          return "_35Ago"
        }
      }
      case 2: {
        if (step == Steps.Advanced) {
          return " _35Ago stepDone"
        } else if (step == Steps.Schedule) {
          return "_35Ago"
        }
        return ""
      }
      case 3: {
        if (step == Steps.Advanced) {
          return "_35Ago"
        }
        return ""
      }
    }
  }

  return (
    <>
      <Card>
        <ul className="_1Lo2h mt-4 mb-5">
          <li className={"_2Jtxm " + getColor(1)}>
            <span className="_2kL0S">1</span>
            <div className="_1hzhf ">Set Information</div>
          </li>
          <li className={"_2Jtxm " + getColor(2)}>
            <span className="_2kL0S">2</span>
            <div className="_1hzhf ">Set Schedule</div>
          </li>
          <li className={"_2Jtxm " + getColor(3)}>
            <span className="_2kL0S">3</span>
            <div className="_1hzhf ">Set Options</div>
          </li>
        </ul>
        {renderSwitch()}
      </Card>
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
