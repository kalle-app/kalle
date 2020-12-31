import { BlitzPage, useMutation, useRouterQuery } from "blitz"
import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import postOAuthToken from "../queries/postOAuthToken"
import createCalendarCredentials from "app/googlecalendar/mutations/createCalendarCredentials"
import { useState, useEffect } from "react"

interface credentials {
  'access_token': string,
  'refresh_token': string,
}

function OAuthCallbackPage() {
  const [isError, setError] = useState(false)
  const [postCredentials] = useMutation(createCalendarCredentials)
  
  let {code} = useRouterQuery()
  useEffect(():void => {
    const handleOAuthCode = () => {
      setError(false)
      try {
        if (!code || Array.isArray(code)) return alert("Google Authentication failed!");
        return postOAuthToken(code)
          .then(({access_token, refresh_token}: credentials) => {
           let x = postCredentials({
              credentials: {access_token, refresh_token},
              name:'calendar',
              status:'active',
              type:'google'
            })
            .catch(()=> setError(true))
            .then((res)=>console.log(res))
            console.log(x)
          })
          .catch(()=> setError(true))
      } catch (error) {
        setError(true);
      }
    };

    handleOAuthCode()
  }, []);

  return (
    <div>
      {isError && <h1>Error</h1>}
      <h1>LOADED, Check DB</h1>
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