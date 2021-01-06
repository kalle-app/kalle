import { google } from "googleapis"
import { Ctx, useQuery } from "blitz"
import { GoogleClient } from "../helpers/GoogleClient"
import getCalendarCredentials from "../oauth/queries/getCalendarCredentials"
import { invoke } from "blitz"
interface DateRange {
    start: Date,
    end: Date
}

export default async function googlequery({start, end}: DateRange, ctx: Ctx) {
    console.log(ctx)
    const auth = GoogleClient.Connection;
    const calendar = google.calendar({version: 'v3', auth});
    //const [query] = useQuery(getCalendarCredentials, null)
    //console.log("query: ", query)
    const credentials:any = await invoke(getCalendarCredentials, ctx)
    console.log("FInish")
    console.log(credentials)
    GoogleClient.Connection.setCredentials({
        refresh_token: credentials[0].credentials.refresh_token
    });
    
    const calendars = await calendar.calendarList.list({
        "minAccessRole": "owner"
      })  
    
    //TODO: handle empty items
    if (!calendars.data.items) return null
    const calendarIDs: string[] = calendars.data.items.map(calendar => calendar.id!)

    const body =  {
        "timeMin": start.toISOString(),
        "timeMax": end.toISOString(),
        "timeZone": 'UTC',
        "groupExpansionMax": 100,
        "calendarExpansionMax": 100,
        "items": calendarIDs.map(item=>({"id":item}))
    }

    calendar.freebusy.query({
        requestBody: body
    }).then((res: any) => {
        console.log("FREEBUSY")
        console.log(res.data.calendars)
    })

    //TODO: return correct content
  return "DONE"
}