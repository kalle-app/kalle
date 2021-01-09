import {useQuery, invoke, Ctx} from "blitz"
import getCalendarCredentials from "../oauth/queries/getCalendarCredentials"
import GoogleClient from "./GoogleClient"

export default async function updateCalendarCredentials(userId: number) {
   // const [credentials] = useQuery(getCalendarCredentials, null)
    //const credentials = invoke(getCalendarCredentials, ctx)
    const credentials = await getCalendarCredentials(userId)

    if (!credentials || credentials == null) return null

    GoogleClient.Connection.setCredentials({
        refresh_token: credentials[0]!.credentials?.refresh_token
    });
}