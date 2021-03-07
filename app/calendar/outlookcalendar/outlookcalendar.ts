import { CalendarService, CreateEventBooking } from "app/calendar/calendar-service"
import {
  AuthorizationHeader,
  getAuthorizationHeader,
} from "app/calendar/outlookcalendar/helper/getAuthorizationHeader"
import { addMinutes } from "date-fns"
import { ConnectedCalendar } from "db"
import { boilDownTimeIntervals } from "app/calendar/utils/boildown-intervals"
import makeRequestTo from "app/calendar/outlookcalendar/helper/callMicrosoftAPI"
import { zonedTimeToUtc } from "date-fns-tz"

export class OutlookCalendarService implements CalendarService {
  private authorizationHeader: AuthorizationHeader
  private calendar: ConnectedCalendar

  public static async getOutlookCalendarService(calendar: ConnectedCalendar) {
    const outlookCalendarService = new OutlookCalendarService(calendar)
    await outlookCalendarService.initialize()
    return outlookCalendarService
  }

  private constructor(calendar: ConnectedCalendar) {
    if (!calendar.refreshToken) {
      throw new Error("refreshToken missing!")
    }
    this.calendar = calendar
  }

  async initialize() {
    this.authorizationHeader = await getAuthorizationHeader(this.calendar.refreshToken!)
  }

  public async createEvent(booking: CreateEventBooking) {
    const url = "https://graph.microsoft.com/v1.0/me/calendar/events"
    const startDate = booking.startDateUTC
    const endDate = addMinutes(booking.startDateUTC, booking.meeting.duration)

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
      url: url,
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
    start.setHours(0, 0)
    end.setHours(23, 59)
    const email = await this.getUsersEmailAddress()
    const url = "https://graph.microsoft.com/v1.0/me/calendar/getschedule"
    const body = {
      Schedules: [email],
      startTime: {
        dateTime: start.toUTCString(),
        timeZone: "UTC",
      },
      endTime: {
        dateTime: end.toUTCString(),
        timeZone: "UTC",
      },
    }

    var options = {
      method: "POST" as const,
      url: url,
      body: JSON.stringify(body),
      headers: { ...this.authorizationHeader, "content-type": "application/json" },
    }
    try {
      const rawScheduleData = await makeRequestTo(options)
      const schedule = rawScheduleData.value[0].scheduleItems
        .filter((event) => (event.status = "busy"))
        .map((event) => {
          return {
            start: zonedTimeToUtc(event.start.dateTime!, "UTC"),
            end: zonedTimeToUtc(event.end.dateTime!, "UTC"),
          }
        })

      return boilDownTimeIntervals(schedule)
    } catch (err) {
      throw new Error("Error while requesting:" + err)
    }
  }

  private async getUsersEmailAddress(): Promise<string> {
    const url = "https://graph.microsoft.com/beta/me/profile/emails"
    const headers = this.authorizationHeader

    const options = {
      headers,
      url: url,
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
