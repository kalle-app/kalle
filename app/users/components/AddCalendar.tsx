import addConnectedCalendarMutation from "../mutations/addConnectedCalendar"
import { invalidateQuery, useMutation, Link } from "blitz"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import styles from "./AddCalendar.module.css"
import { Alert, Card, Form, Button } from "react-bootstrap"
import { useState } from "react"
import { ConnectGoogleCalendarButton } from "app/calendar/googlecalendar/components/ConnectGoogleCalendarButton"
import { ConnectOutlookCalendarButton } from "app/calendar/outlookcalendar/components/ConnectOutlookCalendarButton"
import { AddCalendarInput } from "app/auth/validations"
import getDefaultCalendarByUser from "../queries/getDefaultCalendarByUser"
interface AddCalendarProps {
  onClose(): void
}

const AddCalendar = (props: AddCalendarProps) => {
  const [createCalendar] = useMutation(addConnectedCalendarMutation)
  const [calendarType, setCalendarType] = useState("caldav")
  const [error, setError] = useState({ error: false, message: "" })
  const [message, setMessage] = useState("")

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
              const name = form.get("name") as string
              const url = form.get("url") as string
              const username = form.get("username") as string
              const password = form.get("password") as string

              const parseResult = AddCalendarInput.safeParse({
                type,
                url,
                name,
                password,
                username,
              })

              if (!parseResult.success) {
                setMessage(parseResult.error.errors[0].message)
                return
              }

              const { fail } = await createCalendar({
                name,
                password,
                type: type === "google" ? "GoogleCalendar" : "CaldavDigest",
                url,
                username,
              })

              if (fail) {
                setError({ error: true, message: fail })
                return
              } else {
                setError({ error: false, message: "" })
                await invalidateQuery(getConnectedCalendars)
                await invalidateQuery(getDefaultCalendarByUser)
                props.onClose()
              }
            }}
          >
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                placeholder="Please select a type"
                defaultValue={calendarType}
                onChange={(event) => {
                  setCalendarType(event.target.value)
                }}
              >
                <option value="caldav">CalDav</option>
                <option value="google">Google Calendar</option>
                <option value="outlook">Microsoft Outlook</option>
              </Form.Control>
            </Form.Group>
            {calendarType === "caldav" && <CalDavFormBody />}
            {calendarType === "google" && <GoogleFormBody />}
            {calendarType === "outlook" && <OutlookFormBody />}
            {error.error && (
              <Alert variant="danger">Couldn't connect successfully: {error.message}</Alert>
            )}
            <Form.Text className="text-danger">{message}</Form.Text>
            <div className="p-3 d-flex justify-content-end">
              <Button variant="outline-primary" className="mx-1" onClick={props.onClose}>
                Cancel
              </Button>
              {calendarType === "caldav" && (
                <Button variant="primary" className="mx-1" type="submit">
                  Add
                </Button>
              )}
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}

const CalDavFormBody = () => {
  const [url, setUrl] = useState<string>("")

  return (
    <>
      <Form.Group>
        <Alert variant="danger">
          The CalDav protocol requires us to save your CalDav credentials in a way that we can send
          it in plain text to the host. We encrypt the password, but please be aware that this a
          security risk as we theoretically could access the password in plain text. Check out
          our&nbsp;
          <Link href="https://github.com/kalle-app/kalle">source code</Link>.
        </Alert>
        <Form.Label>Calendar name</Form.Label>
        <Form.Control
          id="caldav-name"
          name="name"
          placeholder="Enter a name you'd like for your calendar"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Calendar URL</Form.Label>
        <Form.Control
          id="caldav-url"
          name="url"
          type="url"
          onChange={(evt) => setUrl(evt.target.value)}
        />
      </Form.Group>
      {url.includes("remote.php") && !url.includes("remote.php/dav") && (
        <Alert variant="info">
          It seems that you're trying to connect a Nextcloud instance. Please use a URL of the
          following form:
          <br />
          <code>{"/remote.php/dav/calendars/<username>/<calendar-name>"}</code>
        </Alert>
      )}
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control autoComplete="username" id="caldav-username" name="username" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          autoComplete="new-password"
          id="caldav-password"
          type="password"
          name="password"
        />
      </Form.Group>
    </>
  )
}

const GoogleFormBody = () => {
  return (
    <>
      <p>Please give Kalle access to your Google Calendar.</p>
      <ConnectGoogleCalendarButton id="google-login-button">
        Go to Google Login
      </ConnectGoogleCalendarButton>
    </>
  )
}

const OutlookFormBody = () => {
  return (
    <>
      <p>Please give Kalle access to your Outlook Calendar.</p>
      <ConnectOutlookCalendarButton id="outlook-login-button">
        Go to Microsoft Login
      </ConnectOutlookCalendarButton>
    </>
  )
}

export default AddCalendar
