import {mergeArr, convertToUnix, convertToExternalEvent} from "../googlecalendar/googlecalendar"
import { Appointment } from "../appointments/types"
import { ConnectedCalendar } from "db"
import { CalendarService } from "app/calendar-service"
import { addMilliseconds } from "date-fns"
import getAuthorizationHeader from "./helper/getAuthorizationHeader"
import makeRequestTo from "./helper/callMicrosoftAPI"
export async function createOutlookEvent(appointment: Appointment, refreshToken: string) {
    const authorizationHeader = await getAuthorizationHeader(refreshToken)
    const url = new URL("https://outlook.office.com/api/v2.0/me/events")


    const startDate = appointment.start
    const endDate = addMilliseconds(appointment.start, appointment.durationInMilliseconds)

    const body = {
        "Subject": appointment.description,
        "Body": {
          "ContentType": "HTML",
          "Content": "I think it will meet our requirements!"
        },
        "Start": {
            "DateTime": startDate,
        },
        "End": {
            "DateTime": endDate,
        },
        "Attendees": [
          {
            "EmailAddress": {
              "Address": appointment.organiser.email,
              "Name": appointment.organiser.name
            },
            "Type": "Required"
          }
        ]
      }

      var options = {
        'method': 'POST' as const,
        'url': url.href,
        'data': body,
        'header': authorizationHeader
      }
      console.log(options)
      const x = await makeRequestTo(options)
      console.log("crear,", x)

}

interface TimeSlotString {
  start: string
  end: string
}

interface DateTimeUnix {
  start: number
  end: number
}

export async function getTakenTimeSlots(start: Date, end: Date, refreshToken: string) {
    console.log("i am taken")
    const authorizationHeader = await getAuthorizationHeader(refreshToken)
    console.log(authorizationHeader)
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
    console.log("FREEBUSY", )
    console.log(x)
    const y = x.value[0].scheduleItems
        .filter((event) => event.status = 'busy')
        .map((event) => {return {start: event.start.dateTime, end: event.end.dateTime}})
    return convertToExternalEvent(mergeArr(convertToUnix(y)))
    //return[{start: new Date(), end: new Date()}]
 

}

export function getCalendarService(calendar: ConnectedCalendar): CalendarService {
  console.log("yeah", calendar)
  return {
    createEvent: (details) => createOutlookEvent(details, calendar.refreshToken!),
    getTakenTimeSlots: (start, end) => getTakenTimeSlots(start, end, calendar.refreshToken!),
  }
}
