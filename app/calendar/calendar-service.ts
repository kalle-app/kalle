import { Booking, ConnectedCalendar, Meeting, User } from "db"
import { CaldavService } from "./caldav"
import { GoogleCalendarService } from "./googlecalendar/googlecalendar"

export type CreateEventBooking = Pick<Booking, "startDateUTC" | "inviteeEmail"> & {
  meeting: Pick<Meeting, "duration" | "location" | "name" | "description"> & {
    owner: Pick<User, "email">
  }
}

export interface ExternalEvent {
  title?: string
  start: Date
  end: Date
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
      return await CaldavService.fromConnectedCalendar(connectedCalendar)
    case "GoogleCalendar":
      return new GoogleCalendarService(connectedCalendar)
    default:
      throw new Error("Unknown Calendar Type: " + connectedCalendar.type)
  }
}
