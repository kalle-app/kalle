import getCalendarCredentials from "../queries/getCalendarCredentials"
import GoogleClient from "./GoogleClient"

export default async function updateCalendarCredentials(userId: number) {
  const credentials = await getCalendarCredentials(userId)

  if (!credentials) return null
  if (!credentials[0].refreshToken || credentials[0].refreshToken == null) return null

  GoogleClient.Connection.setCredentials({
    refresh_token: credentials[0].refreshToken,
  })
}
