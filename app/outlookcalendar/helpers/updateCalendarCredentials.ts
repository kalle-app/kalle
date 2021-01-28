import getOutlookCredentials from "../queries/getOutlookCredentials"
import MicrosoftClient from "./MicrosoftClient"

export default async function updateCalendarCredentials(userId: number) {
  const credentials = await getOutlookCredentials(userId)
  console.log("HERE")
    
  if (!credentials!.account || !credentials!.scopes!) return null
  console.log(credentials)
  await MicrosoftClient.Connection.acquireTokenSilent({account: credentials!.account, scopes: credentials!.scopes})
  console.log("GDHJAFG EKJG FJKS KDHJS G")
//MicrosoftClient.Connection.acquireTokenSilent({account: credentials!.account, scopes: credentials!.scopes}))
}