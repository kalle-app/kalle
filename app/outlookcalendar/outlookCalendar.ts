import { ExternalEvent } from "app/caldav"
import { google } from "googleapis"
import { Appointment } from "../appointments/types"
import { ConnectedCalendar } from "db"
import { CalendarService } from "app/calendar-service"
import { addMilliseconds } from "date-fns"
import getAuthorizationHeader from "./helper/getAuthorizationHeader"

export async function createOutlookEvent(appointment: Appointment, refreshToken: string) {
    const authorizationHeader = await getAuthorizationHeader(refreshToken)

    const startDate = appointment.start
    const endDate = addMilliseconds(appointment.start, appointment.durationInMilliseconds)
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
 

}





export function getCalendarService(calendar: ConnectedCalendar): CalendarService {
  return {
    createEvent: (details) => createOutlookEvent(details, calendar.refreshToken!),
    getTakenTimeSlots: (start, end) => getTakenTimeSlots(start, end, calendar.refreshToken!),
  }
}
