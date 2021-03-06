import { CalendarService, CreateEventBooking } from "app/calendar/calendar-service"
import {
  AuthorizationHeader,
  getAuthorizationHeader,
} from "app/calendar/outlookcalendar/helper/getAuthorizationHeader"
import { addSeconds } from "date-fns"
import { ConnectedCalendar } from "db"
import { boilDownTimeIntervals } from "app/calendar/utils/boildown-intervals"
import makeRequestTo from "app/calendar/outlookcalendar/helper/callMicrosoftAPI"

export class OutlookCalendarService implements CalendarService {
  private authorizationHeader: AuthorizationHeader
  private calendar: ConnectedCalendar

  constructor(calendar: ConnectedCalendar) {
    if (!calendar.refreshToken) {
      throw new Error("refreshToken missing!")
    }
    this.calendar = calendar
  }

  async initialize() {
    this.authorizationHeader = await getAuthorizationHeader(this.calendar.refreshToken!)
  }

  public async createEvent(booking: CreateEventBooking) {
    const url = new URL("https://graph.microsoft.com/v1.0/me/calendar/events")
    const startDate = booking.startDateUTC
    const endDate = addSeconds(booking.startDateUTC, booking.meeting.duration)
    const body = {
      Subject: booking.meeting.name + " with " + booking.inviteeEmail,
      Body: {
        ContentType: "HTML",
        Content: "This meeting was booked via kalle.app",
      },
      Start: {
        DateTime: startDate,
        timeZone: "UTC",
      },
      End: {
        DateTime: endDate,
        timeZone: "UTC",
      },
      Attendees: [
        {
          EmailAddress: {
            Address: booking.inviteeEmail,
            Name: booking.inviteeEmail.split("@")[0],
          },
          Type: "Required",
        },
      ],
    }

    const options = {
      method: "POST" as const,
      url: url.href,
      body: JSON.stringify(body),
      headers: { ...this.authorizationHeader, "content-type": "application/json" },
    }
    try {
      await makeRequestTo(options)
    } catch (err) {
      throw new Error("Error while requesting:" + err)
    }
  }

  public async getTakenTimeSlots(start: Date, end: Date) {
    const email = await this.getUsersEmailAddress()
    const url = new URL("https://graph.microsoft.com/v1.0/me/calendar/getschedule")
    const body = {
      Schedules: [email],
      startTime: {
        dateTime: start,
        timeZone: "UTC",
      },
      endTime: {
        dateTime: end,
        timeZone: "UTC",
      },
    }

    var options = {
      method: "POST" as const,
      url: url.href,
      body: JSON.stringify(body),
      headers: { ...this.authorizationHeader, "content-type": "application/json" },
    }
    try {
      const rawScheduleData = await makeRequestTo(options)
      const schedule = rawScheduleData.value[0].scheduleItems
        .filter((event) => (event.status = "busy"))
        .map((event) => {
          return { start: new Date(event.start.dateTime!), end: new Date(event.end.dateTime!) }
        })

      return boilDownTimeIntervals(schedule)
    } catch (err) {
      throw new Error("Error while requesting:" + err)
    }
  }

  private async getUsersEmailAddress(): Promise<string> {
    const url = new URL("https://graph.microsoft.com/beta/me/profile/emails")
    const headers = this.authorizationHeader

    const options = {
      headers,
      url: url.href,
      method: "GET" as const,
    }

    try {
      const res = await makeRequestTo(options)
      return res.value[0].address
    } catch (err) {
      throw new Error("Error while requesting:" + err)
    }
  }
}
