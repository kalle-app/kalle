import MicrosoftClient from "../helpers/MicrosoftClient"

export default async function getCalendars() {
  const oauth2Client = MicrosoftClient.Connection
  const authCodeUrlParameters = {
    scopes: ["offline_access", "user.read", "openid", "profile", "offline_access", "Calendars.ReadWrite"],
    redirectUri: "http://localhost:3000/outlookRedirect",
  };
  try {
    console.log("GDFHGJF")
    return oauth2Client.getAuthCodeUrl(authCodeUrlParameters)
  } catch {
    console.error("ERROR")
  };
}
