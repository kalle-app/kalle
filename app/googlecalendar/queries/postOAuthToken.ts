import { createGoogleOauth } from "../helpers/GoogleClient"

export default async function postOAuthToken(code: string) {
  const oauth2Client = createGoogleOauth()
  const { tokens } = await oauth2Client.getToken(code)
  return tokens
}
