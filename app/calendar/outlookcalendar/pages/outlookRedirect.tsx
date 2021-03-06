import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useRouterQuery, invoke } from "blitz"
import { Suspense, useState } from "react"
import { Button, Form } from "react-bootstrap"
import handleOAuthCode from "../queries/handleOAuthCode"
interface credentials {
  account: object
  scopes: string[]
}
/**
 * This gets a code as a query parameter. This code needs to be sent to microsoft which returns a refresh_token. The refresh_tokem is used to generate a session_access_token.
 */
function OAuthCallbackPage() {
  const [isError, setIsError] = useState(false)
  const [isCalenderAdded, setIsCalenderAdded] = useState(false)
  const [calendarName, setCalendarName] = useState("Your Outlook Calendar")

  let { code } = useRouterQuery()
  const handleCode = async () => {
    setIsError(false)
    try {
      if (!code || Array.isArray(code))
        return <p>Microsoft Authentication failed with Code {code}. Please try again.</p>

      return await invoke(handleOAuthCode, { code: code, name: calendarName })
    } catch (error) {
      setIsError(true)
    }
  }
  const SettingsLink = () => {
    return (
      <Link href={"/settings"}>
        <Button variant="secondary" href={"/settings"}>
          Go to Calendar Settings
        </Button>
      </Link>
    )
  }

  return (
    <>
      {isError ? (
        <>
          <h1>An error has occurred</h1>
          <p>
            Please try again. Notice that this Microsoft Calendar might already be connected to
            Kalle. If so please edit or delete it in the calendar settings.
          </p>
          <SettingsLink />
        </>
      ) : isCalenderAdded ? (
        <>
          <h3>Great! {calendarName} has been added.</h3>
          <SettingsLink />
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
                onChange={(event) => setCalendarName(event.target.value)}
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
              await handleCode()
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
