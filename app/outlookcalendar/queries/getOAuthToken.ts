import {checkEnvVariable} from "utils/checkEnvVariables"

const tenant = "common"
const client_id = process.env.MICROSOFTCLIENTID
const redirect_uri = "http://localhost:3000/outlookRedirect"
const response_mode = "query"
const scope =  "offline_access user.read mail.read"
const response_type = "code"

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