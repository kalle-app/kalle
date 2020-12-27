import { useState } from "react"
import addConnectedCalendar from "../mutations/addConnectedCalendar"
import { invalidateQuery, useMutation } from "blitz"
import authenticateConnectedCalendar from "../queries/authenticateConnectedCalendar"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import Form from "react-bootstrap/Form"
import styles from "../styles/AddCalendar.module.css"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const initialCalendar = {
  name: "",
  type: "CalDav",
  url: "",
  username: "",
  password: "",
}

interface AddCalendarProps {
  onClose(): void
}

const AddCalendar = (props: AddCalendarProps) => {
  const [calendar, setCalendar] = useState(initialCalendar)
  const [createCalendarMutation] = useMutation(addConnectedCalendar)

  const setValue = (field: string, value: any) => {
    setCalendar({
      ...calendar,
      [field]: value,
    })
  }

  const submit = async () => {
    switch (calendar.type) {
      case "CalDav":
        const response = await authenticateConnectedCalendar({
          url: calendar.url,
          username: calendar.username,
          password: calendar.password,
        })
        if (response.fail !== null) {
          alert("Invalid Credentials")
          return
        }
        break
      default:
        alert("Type currently not supported")
        return
    }
    try {
      await createCalendarMutation(calendar)
      await invalidateQuery(getConnectedCalendars)
    } catch (error) {
      alert("Something went wrong")
    }

    props.onClose()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <Card>
          <div className="text-center px-4 pt-5">
            <h5 className="font-weight-bold">Add Calendar</h5>
          </div>
          <Form className="p-4">
            <Form.Group controlId="formName">
              <Form.Label>Calendar name</Form.Label>
              <Form.Control onChange={(e) => setValue("name", e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formUrl">
              <Form.Label>Calendar URL</Form.Label>
              <Form.Control onChange={(e) => setValue("url", e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" onChange={(e) => setValue("type", e.target.value)}>
                <option>CalDav</option>
                <option>Google Calendar</option>
                <option>Microsoft Outlook</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={(e) => setValue("username", e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setValue("password", e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="p-3 d-flex justify-content-end">
            <Button variant="outline-primary" className="mx-1" onClick={props.onClose}>
              Cancel
            </Button>
            <Button variant="primary" className="mx-1" onClick={() => submit()}>
              Add
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AddCalendar
