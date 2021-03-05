import { constants } from "../constants";
import {checkEnvVariable} from "utils/checkEnvVariables"
import makeRequestTo from "./callMicrosoftAPI"

interface AuthorizationHeader{
    'Authorization': string
}

export default async function getAuthorizationHeader(refreshToken: string): Promise<AuthorizationHeader>{
    const access_token = await callMicrosoftApiForToken(refreshToken)
    return {"Authorization": "Bearer " + access_token}
}

const callMicrosoftApiForToken = async (refreshToken): Promise<string> => {
    const url = new URL(constants.baseURL + 'token');

    var options = {
        'method': 'POST' as const,
        'url': url.href,
        'formData': buildBody(refreshToken)
    }
    const res = await makeRequestTo(options)
    return res.access_token
}

const buildBody = (refreshToken: string) => {
    checkEnvVariable('MICROSOFTCLIENTSECRET')

    return {
        'client_id': constants.client_id,
        'scope': constants.scope,
        'refresh_token': refreshToken,
        'redirect_uri': constants.redirect_uri,
        'grant_type': constants.grant_type_refresh,
        'client_secret': constants.client_secret
    } as const
}