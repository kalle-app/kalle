import addConnectedCalendarMutation from "../mutations/addConnectedCalendar"
import { invalidateQuery, useMutation } from "blitz"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import Form from "react-bootstrap/Form"
import styles from "../styles/AddCalendar.module.css"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

interface AddCalendarProps {
  onClose(): void
}

const AddCalendar = (props: AddCalendarProps) => {
  const [createCalendar] = useMutation(addConnectedCalendarMutation)

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <Card>
          <div className="text-center px-4 pt-5">
            <h5 className="font-weight-bold">Add Calendar</h5>
          </div>
          <Form
            className="p-4"
            id="add-calendar"
            onSubmit={async (evt) => {
              evt.preventDefault()

              const form = new FormData(evt.currentTarget)

              const type = form.get("type") as string
              const url = form.get("url") as string
              const name = form.get("name") as string
              const password = form.get("password") as string
              const username = form.get("username") as string

              if (type !== "CalDav") {
                alert("Type currently not supported")
                return
              }

              const { fail } = await createCalendar({
                name,
                password,
                type,
                url,
                username,
              })

              if (fail) {
                alert("Couldn't connect successfully: " + fail)
                return
              } else {
                await invalidateQuery(getConnectedCalendars)

                props.onClose()
              }
            }}
          >
            <Form.Group controlId="name">
              <Form.Label>Calendar name</Form.Label>
              <Form.Control name="name" />
            </Form.Group>
            <Form.Group controlId="url">
              <Form.Label>Calendar URL</Form.Label>
              <Form.Control name="url" type="url" />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" name="type">
                <option>CalDav</option>
                <option>Google Calendar</option>
                <option>Microsoft Outlook</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" />
            </Form.Group>
            <div className="p-3 d-flex justify-content-end">
              <Button variant="outline-primary" className="mx-1" onClick={props.onClose}>
                Cancel
              </Button>
              <Button variant="primary" className="mx-1" type="submit">
                Add
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default AddCalendar
