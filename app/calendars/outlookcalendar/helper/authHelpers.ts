import { constants } from "../constants";
import makeRequestTo from "./callMicrosoftAPI"
export const requestToken = async (code: string): Promise<string> => { //TODO remove any
    const url = new URL(constants.baseURL + 'token');
    var options = {
        'method': 'POST' as const,
        'url': url.href,
        'formData': buildBody(code)
    }

    const res = await makeRequestTo(options)
    return res.refresh_token
}

const buildBody = (code: string) => {
    return {
        'client_id': constants.client_id,
        'scope': constants.scope,
        'code': code,
        'redirect_uri': constants.redirect_uri,
        'grant_type': constants.grant_type_code,
        'client_secret': constants.client_secret
    } as const
}