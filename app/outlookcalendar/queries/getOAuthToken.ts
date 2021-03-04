import {checkEnvVariable} from "utils/checkEnvVariables"
import {tenant, client_id,redirect_uri, response_mode,scope,response_type } from "../constants"

export default async function getURL(){
    checkEnvVariable('MICROSOFTCLIENTID')
    const url = new URL("https://login.microsoftonline.com/" + tenant + "/oauth2/v2.0/authorize")
    
    url.searchParams.append("client_id", client_id!)
    url.searchParams.append("redirect_uri", redirect_uri)
    url.searchParams.append("response_mode", response_mode)
    url.searchParams.append("scope", scope)
    url.searchParams.append("response_type", response_type!)

    return url.href
}