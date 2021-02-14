import { google } from "googleapis"

export function createGoogleOauth() {
  const callbackString = process.env.HOME_URL + "/gcalOauth2Callback" // for demo reasons

  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    callbackString
  )

  return client
}

export function createAuthenticatedGoogleOauth(refresh_token: string) {
  const client = createGoogleOauth()

  client.setCredentials({
    refresh_token,
  })

  return client
}
