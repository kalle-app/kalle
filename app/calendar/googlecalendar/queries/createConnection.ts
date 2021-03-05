import { createGoogleOauth } from "../helpers/GoogleClient"

export default async function getCcalOAuthUrl() {
  const scopes = ["https://www.googleapis.com/auth/calendar"]

  return createGoogleOauth().generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  })
}
