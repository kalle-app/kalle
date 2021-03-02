import { NotFoundError, resolver } from "blitz"
import db, { Booking, Meeting, User } from "db"
import { addMinutes, subMinutes } from "date-fns"
import reminderQueue from "../api/queues/reminders"
import * as z from "zod"
import { getCalendarService } from "app/calendar-service"
import { getEmailService } from "../../email"
import { createICalendarEvent } from "../utils/createCalendarEvent"

async function sendConfirmationMail(booking: Booking, meeting: Meeting & { owner: User }) {
  const startMonth = (booking.startDateUTC.getMonth() + 1).toString()
  await getEmailService().send({
    template: "confirmation",
    message: {
      to: meeting.owner.email,
      attachments: [
        {
          filename: "appointment.ics",
          content: createICalendarEvent(booking, meeting),
        },
      ],
    },
    locals: {
      appointment: {
        durationInMilliseconds: meeting.duration * 60 * 1000,
        title: meeting.name,
        description: meeting.description ?? "Description",
        location: meeting.location,
        url: "www.kalle.app",
        organiser: {
          name: meeting.ownerName,
          email: meeting.owner.email,
        },
        owner: {
          name: booking.inviteeEmail.split("@")[0],
          email: booking.inviteeEmail,
        },
        start: {
          hour: booking.startDateUTC.getHours(),
          minute:
            booking.startDateUTC.getMinutes() === 0 ? "00" : booking.startDateUTC.getMinutes(),
          day: booking.startDateUTC.getDate(),
          month: startMonth.length === 2 ? startMonth : "0" + startMonth,
          year: booking.startDateUTC.getFullYear(),
        },
        duration: {
          hours: Math.floor(meeting.duration / 60),
          minutes: meeting.duration % 60,
        },
      },
    },
  })
}

export default resolver.pipe(
  resolver.zod(
    z.object({
      meetingId: z.number(),
      inviteeEmail: z.string(),
      startDate: z.date(),
      notificationTime: z.number(),
    })
  ),
  async (bookingInfo) => {
    const meeting = await db.meeting.findUnique({
      where: { id: bookingInfo.meetingId },
      include: { owner: { include: { calendars: true } } },
    })
    if (!meeting) {
      throw new NotFoundError()
    }

    const [primaryCalendar] = meeting.owner.calendars
    if (!primaryCalendar) {
      throw new Error("An error occured: Owner doesn't have a connected calendar")
    }

    const booking = await db.booking.create({
      data: {
        meeting: {
          connect: { id: meeting.id },
        },
        inviteeEmail: bookingInfo.inviteeEmail,
        startDateUTC: bookingInfo.startDate,
      },
    })

    const calendarService = await getCalendarService(primaryCalendar)
    await calendarService.createEvent({
      ...booking,
      meeting,
    })

    const meetingFromDb = await db.meeting.findUnique({
      where: { id: bookingInfo.meetingId },
      include: { owner: true },
    })
    if (!meetingFromDb) {
      throw new Error("meeting not found")
    }

    await sendConfirmationMail(booking, meeting)

    const startTime = subMinutes(bookingInfo.startDate, bookingInfo.notificationTime)
    if (startTime > addMinutes(new Date(), 30)) {
      await reminderQueue.enqueue(booking.id, { runAt: startTime })
    }

    return booking
  }
)
