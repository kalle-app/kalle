import { baseURL, client_id, client_secret, grant_type, redirect_uri, scope } from "../constants";
import * as request from "request"
import {checkEnvVariable} from "utils/checkEnvVariables"
import db from "db"

export default async function getAccessToken(calendarId: number): string{
    const calendar = await db.connectedCalendar.findFirst({
        where: {
            id: calendarId
        },
    })
    if (!calendar) throw new Error("No calendar for this id!")
    console.log(await callMicrosoftApiForToken(calendar.refreshToken))

}

const callMicrosoftApiForToken = async (refreshToken) => {
    const url = new URL(baseURL + 'token');

    var options = {
        'method': 'POST',
        'url': url.href,
        'formData': buildBody(refreshToken)
    }

    return new Promise((resolve, reject) => {request(options, function (error, response) {
        if (error) reject(error);
        const res = JSON.parse(response.body)
        resolve({refresh_token: res.refresh_token, access_token: res.access_token})
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