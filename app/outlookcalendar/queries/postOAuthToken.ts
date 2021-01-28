import MicrosoftClient from "../helpers/MicrosoftClient"

export default async function postOAuthToken(code: string) {
  const oauth2Client = MicrosoftClient.Connection
  const tokenRequest = {
    code: code,
    scopes: ["user.read", "openid", "profile", "offline_access", "Calendars.ReadWrite"],
    redirectUri: "http://localhost:3000/outlookRedirect",
    client_secret: process.env.MICROSOFTCLIENTSECRET
};
  const msalTokenCache = oauth2Client.getTokenCache();
  const cachedAccounts = await msalTokenCache.getAllAccounts();

  const testus = await oauth2Client.acquireTokenByCode(tokenRequest);
  console.log(testus)
  const value = testus.account.homeAccountId;
  const account = await msalTokenCache.getAccountByHomeId(value)

  const silentRequest = {
    account: testus,
    scopes: tokenRequest.scopes
  }
  console.log(silentRequest)
  var x = await MicrosoftClient.Connection.acquireTokenSilent(silentRequest)
  console.log(x)
  // const silent = await oauth2Client.acquireTokenSilent(silentRequest)
  return silentRequest;
}
