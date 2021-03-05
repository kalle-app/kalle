import {requestToken} from "../helper/authHelpers"
import {Ctx} from "blitz"
import createCalendarCredentials from "../helper/createCalendarCredentials"
interface AuthCred {
    code: string,
    name: string
}
export default async function handleOAuthCode(authCred: AuthCred, ctx: Ctx){
    const tokens = await requestToken(authCred.code);
    createCalendarCredentials({name: authCred.name, refreshToken: tokens.refresh_token}, ctx)
    //writeToDB()

    //console.log(token)
    // build new request to get token
    // make request
    // store values in db
}

