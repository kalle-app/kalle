import getAuthorizationHeader from "./getAuthorizationHeader"
import makeRequestTo from "./callMicrosoftAPI"
export default async function getUsersEmailAddress(refreshToken: string): Promise<string>{
    const url = new URL("https://graph.microsoft.com/beta/me/profile/emails")
    const headers = getAuthorizationHeader(refreshToken)

    const options = {
        headers,
        url: url.href,
        'method': "GET" as const
    }
    const res = await makeRequestTo(options)

    return res.value[0].address
}