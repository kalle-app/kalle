import { constants } from "../constants"
import makeRequestTo from "./callMicrosoftAPI"
export const requestToken = async (code: string): Promise<string> => {
  const url = constants.baseURL + "token"
  var options = {
    method: "POST" as const,
    url: url,
    formData: buildBody(code),
  }
  try {
    const res = await makeRequestTo(options)
    return res.refresh_token
  } catch (err) {
    throw new Error("Error while requesting:" + err)
  }
}

const buildBody = (code: string) => {
  return {
    client_id: constants.client_id,
    scope: constants.scope,
    code: code,
    redirect_uri: constants.redirect_uri,
    grant_type: constants.grant_type_code,
    client_secret: constants.client_secret,
  }
}
