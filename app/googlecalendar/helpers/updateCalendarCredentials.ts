import getCalendarCredentials from "../queries/getCalendarCredentials"
import { getGoogleClient } from "./GoogleClient"

export default async function updateCalendarCredentials(userId: number) {
  const credentials = await getCalendarCredentials(userId)

  if (!credentials) return null
  if (!credentials[0].refreshToken || credentials[0].refreshToken == null) return null

  getGoogleClient().setCredentials({
    refresh_token: credentials[0].refreshToken,
  })
}
