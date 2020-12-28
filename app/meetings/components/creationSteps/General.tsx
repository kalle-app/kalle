import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import { Form, Button } from "react-bootstrap"
import { Link } from "blitz"

interface GeneralFormResult {
  name: string
  link: string
  description: string
}

type GeneralProps = {
  toNext: (result: GeneralFormResult) => void
}

const General = (props: GeneralProps) => {
  return (
    <div className="p-3">
      <h4>General Information</h4>
      <p className="pb-3">Add basic information about the meeting</p>
      <Form
        className="m-3"
        onSubmit={(evt) => {
          evt.preventDefault()

          const formData = new FormData(evt.currentTarget)
          props.toNext({
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            link: formData.get("link") as string,
          })
        }}
      >
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" />
        </Form.Group>
        <Form.Group controlId="formLink">
          <Form.Label>Invite Link</Form.Label>
          <Form.Control name="link" />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" />
        </Form.Group>
        <div className="p-3 d-flex justify-content-end">
          <Link href="/meetings">
            <Button className="mx-1">Cancel</Button>
          </Link>
          <Button type="submit">
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default General
