import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import { Meeting } from "../../types"
import Form from "react-bootstrap/Form"

type GeneralProps = {
  toNext: () => void
  onEdit: (key: string, value: any) => void
  meeting: Meeting
}

const General = (props: GeneralProps) => {
  const textChanged = (e: any) => {
    props.onEdit(e.currentTarget.name, e.currentTarget.value)
  }

  return (
    <div className="p-3">
      <h4>General Information</h4>
      <p className="pb-3">Add basic information about the meeting</p>
      <Form className="m-3">
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={props.meeting.name} onChange={textChanged} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Invite Link</Form.Label>
          <Form.Control name="link" value={props.meeting.link} onChange={textChanged} />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={props.meeting.description}
            onChange={textChanged}
          />
        </Form.Group>
      </Form>
      <div className="p-3 d-flex justify-content-end">
        <Button href="/meetings" className="mx-1">
          Cancel
        </Button>
        <Button onClick={props.toNext} type="submit">
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
      </div>
    </div>
  )
}

export default General
