import {mergeArr, convertToUnix, convertToExternalEvent} from "../googlecalendar/googlecalendar"
import { Appointment } from "../appointments/types"
import { ConnectedCalendar } from "db"
import { CalendarService } from "app/calendar-service"
import { addMilliseconds } from "date-fns"
import getAuthorizationHeader from "./helper/getAuthorizationHeader"
import makeRequestTo from "./helper/callMicrosoftAPI"
export async function createOutlookEvent(appointment: Appointment, refreshToken: string) {
    const authorizationHeader = await getAuthorizationHeader(refreshToken)
    const url = new URL("https://graph.microsoft.com/v1.0/me/calendar/events")
    const startDate = appointment.start
    const endDate = addMilliseconds(appointment.start, appointment.durationInMilliseconds)
    const body = {
        "Subject": appointment.title,
        "Body": {
          "ContentType": "HTML",
          "Content": "This meeting was booked via kalle.app"
        },
        "Start": {
            "DateTime": startDate,
            "timeZone":"UTC"
        },
        "End": {
            "DateTime": endDate,
            "timeZone":"UTC"
        },
        "Attendees": [
          {
            "EmailAddress": {
              "Address": appointment.owner.email,
              "Name": appointment.owner.name
            },
            "Type": "Required"
          }
        ]
      }

      var options = {
        'method': 'POST' as const,
        'url': url.href,
        'body': JSON.stringify(body),
        'headers': {...authorizationHeader, "content-type": 'application/json'}
      }
      const x = await makeRequestTo(options)

}

export async function getTakenTimeSlots(start: Date, end: Date, refreshToken: string) {
    const authorizationHeader = await getAuthorizationHeader(refreshToken)
    const url = new URL("https://graph.microsoft.com/v1.0/me/calendar/getschedule")
    const body = {        
        "Schedules": ["lasklu@gmail.com"],
        "startTime": {
            "dateTime": start,
            "timeZone":"UTC"
        },
        "endTime": {
            "dateTime": end,
            "timeZone":"UTC"
        },
    }

    var options = {
        'method': 'POST' as const,
        'url': url.href,
        'body': JSON.stringify(body),
        'headers': {...authorizationHeader, "content-type": 'application/json'}
      }
    const x = await makeRequestTo(options)
    const y = x.value[0].scheduleItems
        .filter((event) => event.status = 'busy')
        .map((event) => {return {start: event.start.dateTime, end: event.end.dateTime}})
    return convertToExternalEvent(mergeArr(convertToUnix(y)))
    //return[{start: new Date(), end: new Date()}]
 

}

export function getCalendarService(calendar: ConnectedCalendar): CalendarService {
  return {
    createEvent: (details) => createOutlookEvent(details, calendar.refreshToken!),
    getTakenTimeSlots: (start, end) => getTakenTimeSlots(start, end, calendar.refreshToken!),
  }
}
