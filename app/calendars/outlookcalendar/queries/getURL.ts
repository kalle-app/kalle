import {checkEnvVariable} from "utils/checkEnvVariables"
import { constants } from "../constants"

export default async function getURL(){
    checkEnvVariable('MICROSOFTCLIENTID')
    const url = new URL(constants.baseURL + "authorize")
    
    url.searchParams.append("client_id", constants.client_id)
    url.searchParams.append("redirect_uri", constants.redirect_uri)
    url.searchParams.append("response_mode", constants.response_mode)
    url.searchParams.append("scope", constants.scope)
    url.searchParams.append("response_type", constants.response_type)

    return url.href
}