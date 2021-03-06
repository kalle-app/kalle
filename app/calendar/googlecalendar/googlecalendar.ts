import { google, calendar_v3 } from "googleapis"
import { createAuthenticatedGoogleOauth } from "./helpers/GoogleClient"
import { ConnectedCalendar } from "db"
import { CalendarService, CreateEventBooking } from "app/calendar/calendar-service"
import { addSeconds } from "date-fns"
import { boilDownTimeIntervals } from "./helpers/boildown-intervals"

export class GoogleCalendarService implements CalendarService {
  private calendar: calendar_v3.Calendar

  constructor(calendar: ConnectedCalendar) {
    if (!calendar.refreshToken) {
      throw new Error("refreshToken missing!")
    }

    this.calendar = google.calendar({
      version: "v3",
      auth: createAuthenticatedGoogleOauth(calendar.refreshToken),
    })
  }

  public async createEvent(booking: CreateEventBooking) {
    const startDate = booking.startDateUTC
    const endDate = addSeconds(booking.startDateUTC, booking.meeting.duration * 60)

    await this.calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: booking.meeting.name,
        location: booking.meeting.location ?? "",
        description: booking.meeting.description,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "Etc/UTC",
        },
        end: {
          dateTime: endDate.toISOString(),
        },
        attendees: [{ email: booking.meeting.owner.email }, { email: booking.inviteeEmail }],
        reminders: {
          useDefault: true,
        },
      },
    })
  }

  public async getTakenTimeSlots(start: Date, end: Date) {
    start.setHours(0, 0)
    end.setHours(23, 59)
    const {
      data: { items: ownedCalendars = [] },
    } = await this.calendar.calendarList.list({
      minAccessRole: "owner",
    })

    const {
      data: { calendars: calendarsWithFreeBusy },
    } = await this.calendar.freebusy.query({
      requestBody: {
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        timeZone: "UTC",
        groupExpansionMax: 100,
        calendarExpansionMax: 100,
        items: ownedCalendars.map((calendar) => ({ id: calendar.id! })),
      },
    })

    const rawFreeBusy = Object.values(calendarsWithFreeBusy ?? {})
      .flatMap((calendar) => calendar.busy ?? [])
      .map(({ start, end }) => ({ start: new Date(start!), end: new Date(end!) }))

    return boilDownTimeIntervals(rawFreeBusy)
  }
}
