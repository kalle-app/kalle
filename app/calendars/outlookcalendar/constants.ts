import {checkEnvVariable} from "utils/checkEnvVariables"

const tenant = "common"
export const client_id = (): string => {
    checkEnvVariable('MICROSOFTCLIENTID')
    return process.env.MICROSOFTCLIENTID!
}
export const redirect_uri = (): string => {
    checkEnvVariable('HOME_URL')
    return process.env.HOME_URL + "/outlookRedirect"
}
export const response_mode = () => "query"
export const scope = () => "offline_access user.read mail.read calendars.ReadWrite https://outlook.office.com/calendars.readwrite"
export const response_type = () => "code"
export const baseURL = () => "https://login.microsoftonline.com/" + tenant + "/oauth2/v2.0/"
export const grant_type_code = () => "authorization_code"
export const grant_type_refresh = () => "refresh_token"
export const client_secret = (): string => {
    checkEnvVariable('MICROSOFTCLIENTSECRET')
    return process.env.MICROSOFTCLIENTSECRET!
}