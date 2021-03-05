import { baseURL, client_id, client_secret, grant_type_refresh, redirect_uri, scope } from "../constants";
import * as request from "request"
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
    const url = new URL(baseURL + 'token');

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
        'client_id': client_id!,
        'scope': scope,
        'refresh_token': refreshToken,
        'redirect_uri': redirect_uri,
        'grant_type': grant_type_refresh,
        'client_secret': client_secret!
    } as const
}