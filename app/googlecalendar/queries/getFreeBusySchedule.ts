import {useQuery, Ctx} from "blitz"
import getCalendarCredentials from "../oauth/queries/getCalendarCredentials"
import googlequery from "../helpers/googlequery"
import updateCalendarCredentials from "../helpers/updateCalendarCredentials"
import GoogleClient from "../helpers/GoogleClient"
import { google } from "googleapis"

interface DateTime {
    start: Date,
    end: Date, 
}
interface DateTimeUnix {
    start: number,
    end: number, 
}
interface Props {
    start: Date,
    end: Date, 
    userId: number
}



export default async function getFreeBusySchedule({start, end, userId}: Props) {
    await updateCalendarCredentials(userId)
    const auth = GoogleClient.Connection;
    const calendar = google.calendar({version: 'v3', auth});
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

    return calendar.freebusy.query({
        requestBody: body
    }).then((res: any) => {

        //var mandrill_events = JSON.parse(res.data.calendars);
        //console.log(mandrill_events)
        var final_array: DateTime[] = []
        for (var key in res.data.calendars) {
            final_array.push(...res.data.calendars[key].busy)
        }
        //console.log(final_array)
        final_array.map((el:any)=>{
            el.start = new Date(el.start).getTime() / 1000
            el.end = new Date(el.end).getTime() / 1000
        })
        //console.log(final_array)
        const result: DateTimeUnix[] = mergeArr(final_array)
        final_array.map((el:any)=>{
            el.start = new Date(el.start*1000);
            el.end = new Date(el.end*1000);
        })
        console.log(final_array)
        //console.log(final_array)
        for (var key in res.data.calendars) {
            var value = res.data.calendars[key];
            value.busy.map((el) => new Date(el.start).getTime() / 1000)
          //  console.log(value)
        }
        return res.data.calendars
    })

    //TODO: return correct content
}

function mergeArr(arr: DateTimeUnix[]) {
    // Sort the array in descending order
    arr.sort(function(a, b) {
        return a.start - b.start;
    });

    var hilfe: DateTimeUnix[] = []
    arr.push({start: 16754814600, end: 16754818200})
    var old = arr[0]
    var temp: DateTimeUnix = {start: -1, end: -1};
    for(var el of arr){
        var curr = el;
        if (curr == old) {
            continue
        }
        if (curr.start <= old.end){
            if (temp.start == -1){
                temp.start = old!.start;
            }

            curr.start = old.start
        } else {
            if (temp.start == -1){
                temp.start = old.start!;
                temp.end = old.end!;
            }else {
                temp.end = old.end!
            }
            hilfe.push(temp)
            temp = {start: -1, end: -1};
        }

        old = el;
    }
    return hilfe.sort(function(a, b) {
        return a.start - b.start;
    });
}