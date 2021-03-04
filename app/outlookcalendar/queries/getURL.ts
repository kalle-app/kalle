import {checkEnvVariable} from "utils/checkEnvVariables"
import {client_id, redirect_uri, response_mode, scope, response_type, baseURL } from "../constants"

export default async function getURL(){
    checkEnvVariable('MICROSOFTCLIENTID')
    const url = new URL(baseURL + "authorize")
    
    url.searchParams.append("client_id", client_id!)
    url.searchParams.append("redirect_uri", redirect_uri)
    url.searchParams.append("response_mode", response_mode)
    url.searchParams.append("scope", scope)
    url.searchParams.append("response_type", response_type!)

    return url.href
}