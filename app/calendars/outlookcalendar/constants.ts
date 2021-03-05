import {checkEnvVariable} from "utils/checkEnvVariables"

export const constants = {
    get client_id() {
        checkEnvVariable('MICROSOFTCLIENTID')
        return process.env.MICROSOFTCLIENTID!
    },
    get client_secret() {
        checkEnvVariable('MICROSOFTCLIENTSECRET')
        return process.env.MICROSOFTCLIENTSECRET!
    },
    get redirect_uri() {
        checkEnvVariable('HOME_URL')
        return process.env.HOME_URL + "/outlookRedirect"
    },
    response_mode: "query" as const,
    scope: "offline_access user.read calendars.ReadWrite" as const,
    response_type: "code" as const,
    baseURL: "https://login.microsoftonline.com/common/oauth2/v2.0/" as const,
    grant_type_code: "authorization_code" as const,
    grant_type_refresh: "refresh_token" as const,
} as const