import { useMutation, Ctx } from "blitz"
import MicrosoftClient from "../helpers/MicrosoftClient"
import createCalendarCredentials from "../mutations/createCalendarCredentials"

export default async function postOAuthToken(code: string) {
  const oauth2Client = MicrosoftClient.Connection
  //const createCalendar = useMutation(createCalendarCredentials)
  const msalTokenCache = oauth2Client.getTokenCache()
  console.log(msalTokenCache)
  const tokenRequest = {
    code: code,
    scopes: ["user.read", "Calendars.ReadWrite"],
    forceRefresh: true,
    redirectUri: "http://localhost:3000/outlookRedirect",
    //client_secret: process.env.MICROSOFTCLIENTSECRET,
  }
  const testus = await oauth2Client.acquireTokenByCode(tokenRequest)
  const tokenRequest2 = {
    scopes: ["user.read", "Calendars.ReadWrite"],
    forceRefresh: true,
    redirectUri: "http://localhost:3000/outlookRedirect",
    account: testus.account,
  }
  console.log("TESTUS", testus)

  console.log({ account: testus.account, scopes: tokenRequest2.scopes })
  return { account: testus.account, scopes: tokenRequest2.scopes }
  oauth2Client
    .acquireTokenSilent(tokenRequest2)
    .then((response) => {
      console.log("\nResponse: \n:", response)
      //return msalTokenCache.writeToPersistence()
    })
    .catch((error) => {
      console.log(error)
    })

  //const msalTokenCache = oauth2Client.getTokenCache()
  const cachedAccounts = await msalTokenCache.getAllAccounts()

  console.log(testus)
  const value = testus.account.homeAccountId
  const account = await msalTokenCache.getAccountByHomeId(value)

  const silentRequest = {
    account: testus,
    scopes: tokenRequest.scopes,
  }
  console.log(silentRequest)
  var x = await MicrosoftClient.Connection.acquireTokenSilent(silentRequest)
  console.log(x)
  // const silent = await oauth2Client.acquireTokenSilent(silentRequest)
  return silentRequest
}
