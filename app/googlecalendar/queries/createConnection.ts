import { getGoogleClient } from "../helpers/GoogleClient"

export default async function getGcalOAuthConnection(_ = null) {
  const scopes = ["https://www.googleapis.com/auth/calendar"]

  return getGoogleClient().generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  })
}
