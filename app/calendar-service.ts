import { Booking, ConnectedCalendar, Meeting, User } from "db"
import { ExternalEvent, getCalendarService as getCalDavCalendarService } from "./caldav"
import { getCalendarService as getGoogleCalendarService } from "app/googlecalendar/googlecalendar"

export type CreateEventBooking = Pick<Booking, "startDateUTC" | "inviteeEmail"> & {
  meeting: Pick<Meeting, "duration" | "location" | "name" | "description"> & {
    owner: Pick<User, "email">
  }
}
export interface CalendarService {
  createEvent(booking: CreateEventBooking): Promise<void>
  getTakenTimeSlots(start: Date, end: Date): Promise<ExternalEvent[]>
}

export async function getCalendarService(
  connectedCalendar: ConnectedCalendar
): Promise<CalendarService> {
  switch (connectedCalendar.type) {
    case "CaldavBasic":
    case "CaldavDigest":
      return await getCalDavCalendarService(connectedCalendar)
    case "GoogleCalendar":
      return getGoogleCalendarService(connectedCalendar)
    default:
      throw new Error("Unknown Calendar Type: " + connectedCalendar.type)
  }
}
