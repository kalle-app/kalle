import { BlitzPage, useMutation, useRouterQuery } from "blitz"
import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import postOAuthToken from "../queries/postOAuthToken"
import createCalendarCredentials from "app/googlecalendar/mutations/createCalendarCredentials"
import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"

interface credentials {
  access_token: string
  refresh_token: string
}

function OAuthCallbackPage() {
  const [isError, setError] = useState(false)
  const [postCredentials] = useMutation(createCalendarCredentials)

  let { code } = useRouterQuery()
  useEffect((): void => {
    const handleOAuthCode = () => {
      setError(false)
      try {
        if (!code || Array.isArray(code)) return alert("Google Authentication failed!")
        return postOAuthToken(code)
          .then(({ access_token, refresh_token }: credentials) => {
            let x = postCredentials({
              credentials: { access_token, refresh_token },
              name: "calendar",
              status: "active",
              type: "google",
            }).catch(() => setError(true))
            // .then((res) => console.log("response: ", res))
          })
          .catch(() => setError(true))
      } catch (error) {
        setError(true)
      }
    }

    handleOAuthCode()
  }, [])

  return (
    <div>
      {isError && <h1>An unknown error has occurred. Please try again.</h1>}
      {!isError && <h1>Your Calendar has been added.</h1>}
      <Button variant="primary" href={"/settings"}>
        {isError && "Try again"}
        {!isError && "Check out my Calendars"}
      </Button>
    </div>
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

oAuth2Callback.getLayout = (page) => <Layout title="Test">{page}</Layout>

export default oAuth2Callback
