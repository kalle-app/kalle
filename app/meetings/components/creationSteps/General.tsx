import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import { Form, Button } from "react-bootstrap"
import { Link, useQuery } from "blitz"
import { useEffect, useState } from "react"
import { GeneralInformationInput } from "app/auth/validations"
import getDefaultLink from "app/meetings/queries/getDefaultLink"
import { Meeting } from "app/meetings/types"

interface GeneralFormResult {
  name: string
  link: string
  location: string
  description: string
}

type GeneralProps = {
  initialMeeting: Meeting
  toNext: (result: GeneralFormResult) => void
  userName: string
}

const General = (props: GeneralProps) => {
  const [message, setMessage] = useState("")
  const [meetingLink, setMeetingLink] = useState("")
  const [defaultLink] = useQuery(getDefaultLink, null)

  useEffect(() => {
    setMeetingLink(defaultLink)
  }, [])

  const updateMeetingLink = (input: string) => {
    setMeetingLink(input.substr(props.userName.length + 1))
  }

  return (
    <div className="p-3">
      <Form
        className="m-3"
        onSubmit={(evt) => {
          evt.preventDefault()

          const formData = new FormData(evt.currentTarget)
          const name = formData.get("name") as string
          const description = formData.get("description") as string
          const link = meetingLink as string
          const location = formData.get("location") as string

          const parseResult = GeneralInformationInput.safeParse({
            name,
            description,
            link,
            location,
          })

          if (!parseResult.success) {
            setMessage(parseResult.error.errors[0].message)
            return
          }

          props.toNext({
            name: name,
            description: description,
            location: location,
            link: link,
          })
        }}
      >
        <h4>General Information</h4>
        <p className="pb-2">Add basic information about the meeting</p>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control defaultValue={props.initialMeeting.name} name="name" />
        </Form.Group>
        <Form.Group controlId="link">
          <Form.Label>Invite Link</Form.Label>
          <Form.Control
            name="link"
            onChange={(event) => {
              updateMeetingLink(event.currentTarget.value)
            }}
            defaultValue={props.userName + "/" + props.initialMeeting.link}
            value={props.userName + "/" + meetingLink}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            defaultValue={props.initialMeeting.description}
            as="textarea"
            rows={3}
            name="description"
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control defaultValue={props.initialMeeting.location} name="location" />
        </Form.Group>
        <Form.Text className="text-danger">{message}</Form.Text>
        <div className="p-3 d-flex justify-content-end">
          <Link href="/meetings">
            <Button className="mx-1">Cancel</Button>
          </Link>
          <Button id="submit" type="submit">
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default General
