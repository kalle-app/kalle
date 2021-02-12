import { createGoogleOauth } from "../helpers/GoogleClient"

export default async function getGcalOAuthConnection(_ = null) {
  const scopes = ["https://www.googleapis.com/auth/calendar"]

  return createGoogleOauth().generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  })
}
