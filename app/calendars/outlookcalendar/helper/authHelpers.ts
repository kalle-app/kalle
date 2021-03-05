import { checkEnvVariable } from "utils/checkEnvVariables";
import { baseURL, client_id, client_secret, grant_type_code, redirect_uri, scope } from "../constants";
import makeRequestTo from "./callMicrosoftAPI"
export const requestToken = async (code: string): Promise<string> => { //TODO remove any
    const url = new URL(baseURL + 'token');
    var options = {
        'method': 'POST' as const,
        'url': url.href,
        'formData': buildBody(code)
    }

    const res = await makeRequestTo(options)
    return res.refresh_token
}

const buildBody = (code: string) => {
    checkEnvVariable('MICROSOFTCLIENTSECRET')

    return {
        'client_id': client_id!,
        'scope': scope,
        'code': code,
        'redirect_uri': redirect_uri,
        'grant_type': grant_type_code,
        'client_secret': client_secret!
    } as const
}