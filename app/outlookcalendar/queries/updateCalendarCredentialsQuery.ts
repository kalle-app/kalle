import getOutlookCredentials from "../queries/getOutlookCredentials"
import MicrosoftClient from "../helpers/MicrosoftClient"

export default async function updateCalendarCredentials(userId: number) {
  const credentials = await getOutlookCredentials(userId)
  console.log("HERE")

  if (!credentials!.account || !credentials!.scopes!) return null

  await MicrosoftClient.Connection.acquireTokenSilent({
    account: credentials!.account,
    scopes: credentials!.scopes,
  })
  //MicrosoftClient.Connection.acquireTokenSilent({account: credentials!.account, scopes: credentials!.scopes}))
}
