import addGoogleCalendarCredentialsMutation from "app/googlecalendar/mutations/createCalendarCredentials"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useMutation, useRouterQuery } from "blitz"
import { Suspense, useState } from "react"
import { Button, Form } from "react-bootstrap"

/**
 * This gets a code as a query parameter. This code needs to be sent to googleapi which returns a refresh_token. The refresh_tokem is used to generate a session_access_token.
 */
function OAuthCallbackPage() {
  const [isError, setIsError] = useState(false)
  const [isCalendarAdded, setIsCalendarAdded] = useState(false)
  const [addGoogleCalendarCredentials] = useMutation(addGoogleCalendarCredentialsMutation)
  const [calendarName, setCalendarName] = useState("Your Google Calendar")
  let { code } = useRouterQuery()

  const handleOAuthCode = async () => {
    setIsError(false)
    try {
      if (!code || Array.isArray(code)) {
        throw new Error(`Google Authentication failed with Code ${code}. Please try again.`)
      }

      await addGoogleCalendarCredentials({ oauthCode: code, name: calendarName, status: "active" })
      setIsCalendarAdded(true)
    } catch (error) {
      setIsError(true)
    }
  }

  const SettingsLink = () => {
    return (
      <Link href={"/calendars"}>
        <Button variant="secondary" href={"/calendars"}>
          Go to Calendar Settings
        </Button>
      </Link>
    )
  }

  if (isError) {
    return (
      <>
        <h1>An error has occurred</h1>
        <p>
          Please try again. Notice that this Google Calendar might already be connected to Kalle. If
          so please edit or delete it in the calendar settings.
        </p>
        <SettingsLink />
      </>
    )
  }

  if (isCalendarAdded) {
    return (
      <>
        <h3>Great! {calendarName} has been added.</h3>
        <SettingsLink />
      </>
    )
  }
  return (
    <>
      <h1>Your Authentication was succesful.</h1>
      <h3>Last step. Please choose a name for your new Calendar.</h3>
      <Form>
        <Form.Group controlId="formGoogleCalendarName">
          <Form.Label>Calendar Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter a name you'd like for your calendar"
            onChange={(event) => setCalendarName(event.target.value)}
          />
          <Form.Text className="text-muted">
            This name helps you to recognize the calendar. For example "Private" or "My project with
            Alice".
          </Form.Text>
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={handleOAuthCode}>
        Add Calendar
      </Button>
    </>
  )
}

const GcalOAuth2Callback: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading ...">
        <OAuthCallbackPage />
      </Suspense>
    </div>
  )
}

GcalOAuth2Callback.authenticate = trues
GcalOAuth2Callback.getLayout = (page) => <Layout title="Add your Google Calendar">{page}</Layout>

export default GcalOAuth2Callback
