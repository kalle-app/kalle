import { ConnectedCalendar } from "db"
import { Appointment } from "app/appointments/types"
import { ExternalEvent } from "./caldav"

export interface CalendarService {
  createEvent(appointment: Appointment): Promise<void>
  getTakenTimeSlots(start: Date, end: Date): Promise<ExternalEvent[]>
}

export async function getCalendarService(connectedCalendar: ConnectedCalendar): Promise<CalendarService> {
  switch (connectedCalendar.type) {
    case "CaldavBasic":
    case "CaldavDigest":
      return await getCalendarService(connectedCalendar)
    default:
      throw new Error("Unknown Calendar Type: " + connectedCalendar.type)
  }
}
