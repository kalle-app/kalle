import {mergeArr, convertToUnix, convertToExternalEvent} from "../utils"
import { Appointment } from "../../appointments/types"
import { ConnectedCalendar } from "db"
import { CalendarService } from "app/calendar-service"
import { addMilliseconds } from "date-fns"
import getAuthorizationHeader from "./helper/getAuthorizationHeader"
import makeRequestTo from "./helper/callMicrosoftAPI"
import getUsersEmailAddress from "./helper/getUsersEmailAddress"

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
      try {
        await makeRequestTo(options)
      } catch(err) {
        throw new Error("Error while requesting:" + err)
      }
      

}

export async function getTakenTimeSlots(start: Date, end: Date, refreshToken: string) {
    const email = await getUsersEmailAddress(refreshToken)
    const authorizationHeader = await getAuthorizationHeader(refreshToken)
    const url = new URL("https://graph.microsoft.com/v1.0/me/calendar/getschedule")
    const body = {        
        "Schedules": [email],
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
    try {
      const rawScheduleData = await makeRequestTo(options)

      const schedule = rawScheduleData.value[0].scheduleItems
          .filter((event) => event.status = 'busy')
          .map((event) => {return {start: event.start.dateTime, end: event.end.dateTime}})
      return convertToExternalEvent(mergeArr(convertToUnix(schedule)))
    } catch(err) {
      throw new Error("Error while requesting:" + err)
    }
}

export function getCalendarService(calendar: ConnectedCalendar): CalendarService {
  return {
    createEvent: (details) => createOutlookEvent(details, calendar.refreshToken!),
    getTakenTimeSlots: (start, end) => getTakenTimeSlots(start, end, calendar.refreshToken!),
  }
}
