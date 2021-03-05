import { ConnectedCalendar } from "db"
import { Appointment } from "app/appointments/types"
import { ExternalEvent, getCalendarService as getCalDavCalendarService } from "./caldav"
import { getCalendarService as getGoogleCalendarService } from "app/googlecalendar/googlecalendar"
import {getCalendarService as getOutlookCalendarService} from "app/outlookcalendar/outlookCalendar"

export interface CalendarService {
  createEvent(appointment: Appointment): Promise<void>
  getTakenTimeSlots(start: Date, end: Date): Promise<ExternalEvent[]>
}

export async function getCalendarService(
  connectedCalendar: ConnectedCalendar
): Promise<CalendarService> {
  console.log(connectedCalendar.type)
  switch (connectedCalendar.type) {
    case "CaldavBasic":
    case "CaldavDigest":
      return await getCalDavCalendarService(connectedCalendar)
    case "GoogleCalendar":
      return getGoogleCalendarService(connectedCalendar)
    case "OutlookCalendar":
      return getOutlookCalendarService(connectedCalendar)
    default:
      throw new Error("Unknown Calendar Type: " + connectedCalendar.type)
  }
}
