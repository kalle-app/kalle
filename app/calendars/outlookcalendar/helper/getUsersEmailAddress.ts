import getAuthorizationHeader from "./getAuthorizationHeader"
import makeRequestTo from "./callMicrosoftAPI"
export default async function getUsersEmailAddress(refreshToken: string): Promise<string>{
    const url = new URL("https://graph.microsoft.com/beta/me/profile/emails")
    const headers = await getAuthorizationHeader(refreshToken)

    const options = {
        headers,
        url: url.href,
        method: "GET" as const
    }

    try {
        const res = await makeRequestTo(options)
        return res.value[0].address
    } catch(err) {
        throw new Error("Error while requesting:" + err)
    }
}