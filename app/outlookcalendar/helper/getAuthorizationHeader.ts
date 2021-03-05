import { baseURL, client_id, client_secret, grant_type, redirect_uri, scope } from "../constants";
import * as request from "request"
import {checkEnvVariable} from "utils/checkEnvVariables"
import db from "db"

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
        'method': 'POST',
        'url': url.href,
        'formData': buildBody(refreshToken)
    }

    return new Promise((resolve, reject) => {request(options, function (error, response) {
        if (error) reject(error);
        const res = JSON.parse(response.body)
        resolve(res.access_token)
    })})
}

const buildBody = (refreshToken: string) => {
    checkEnvVariable('MICROSOFTCLIENTSECRET')

    return {
        'client_id': client_id!,
        'scope': scope,
        'refresh_token': refreshToken,
        'redirect_uri': redirect_uri,
        'grant_type': grant_type,
        'client_secret': client_secret!
    } as const
}