import GoogleClient from "../../helpers/GoogleClient"

export default async function postOAuthToken(code: string) {
  const oauth2Client = GoogleClient.Connection
  const { tokens } = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens)
  return tokens
}
