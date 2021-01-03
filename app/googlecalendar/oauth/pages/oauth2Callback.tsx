import { BlitzPage, Link, useMutation, useRouterQuery } from "blitz"
import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import postOAuthToken from "../queries/postOAuthToken"
import createCalendarCredentials from "app/googlecalendar/mutations/createCalendarCredentials"
import { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"

interface credentials {
  access_token: string
  refresh_token: string
}

function OAuthCallbackPage() {
  const [isError, setIsError] = useState(false)
  const [isCalenderAdded, setIsCalenderAdded] = useState(false)
  const [postCredentials] = useMutation(createCalendarCredentials)
  const [calendarName, setCalendarName] = useState("Your Google Calendar")
  let { code } = useRouterQuery()

  const handleOAuthCode = async () => {
    setIsError(false)
    try {
      if (!code || Array.isArray(code))
        return <p>Google Authentication failed with Code {code}. Please try again.</p>
      return postOAuthToken(code)
        .then(({ access_token, refresh_token }: credentials) => {
          let x = postCredentials({
            credentials: { access_token, refresh_token },
            name: calendarName,
            status: "Active",
            type: "Google Calendar",
          }).catch(() => setIsError(true))
        })
        .catch((e) => setIsError(true))
    } catch (error) {
      setIsError(true)
    }
  }

  return (
    <>
      {isError ? (
        <h1>An unknown error has occurred. Please try again.</h1>
      ) : isCalenderAdded ? (
        <>
          <h3>Great! {calendarName} has been added.</h3>
          <Link href={"/settings"}>
            <Button variant="secondary" href={"/settings"}>
              Go to Calendar Settings
            </Button>
          </Link>{" "}
        </>
      ) : (
        <>
          <h1>Your Authentication was succesful.</h1>
          <h3>Last step. Please choose a name for your new Calendar.</h3>
          <Form>
            <Form.Group controlId="formGoogleCalendarName">
              <Form.Label>Calendar Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter a name you'd like for your calendar"
                onChange={(event) => setCalendarName(event?.target.value)}
              />
              <Form.Text className="text-muted">
                This name helps you to recognize the calendar. For example "Private" or "My project
                with Alice".
              </Form.Text>
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            onClick={async () => {
              await handleOAuthCode()
              if (!isError) setIsCalenderAdded(true)
            }}
          >
            Add Calendar
          </Button>
        </>
      )}
    </>
  )
}

const oAuth2Callback: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading ...">
        <OAuthCallbackPage />
      </Suspense>
    </div>
  )
}

oAuth2Callback.getLayout = (page) => <Layout title="Add your Google Calendar">{page}</Layout>

export default oAuth2Callback
