import { requestToken } from "../helper/authHelpers"
import { Ctx } from "blitz"
import createCalendarCredentials from "../helper/createCalendarCredentials"
interface AuthCred {
  code: string
  name: string
}
export default async function handleOAuthCode(authCred: AuthCred, ctx: Ctx) {
  const refresh_token = await requestToken(authCred.code)
  createCalendarCredentials({ name: authCred.name, refreshToken: refresh_token }, ctx)
}
