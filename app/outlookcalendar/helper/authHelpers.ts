import * as request from "request"

import { checkEnvVariable } from "utils/checkEnvVariables";
import { baseURL, client_id, client_secret, grant_type, redirect_uri, scope } from "../constants";

export const requestToken = async (code: string): Promise<{access_token: string, refresh_token: string}> => { //TODO remove any
    const url = new URL(baseURL + 'token');

    var options = {
        'method': 'POST',
        'url': url.href,
        'formData': buildBody(code)
    }

    return new Promise((resolve, reject) => {request(options, function (error, response) {
        if (error) reject(error);
        const res = JSON.parse(response.body)
        resolve({refresh_token: res.refresh_token, access_token: res.access_token})
    })})
}

const buildBody = (code: string) => {
    checkEnvVariable('MICROSOFTCLIENTSECRET')

    return {
        'client_id': client_id!,
        'scope': scope,
        'code': code,
        'redirect_uri': redirect_uri,
        'grant_type': grant_type,
        'client_secret': client_secret!
    } as const
}