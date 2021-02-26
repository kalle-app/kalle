import { NotFoundError, resolver } from "blitz"
import db from "db"
import { addMinutes, subMinutes } from "date-fns"
import reminderQueue from "../../api/queues/reminders"
import * as z from "zod"
import { getCalendarService } from "app/calendar-service"
import { getEmailService } from "../../email"
import { Appointment } from "../types"
import { createCalendarEvent } from "../utils/createCalendarEvent"

interface BookingDetails {
  meetingId: number
  inviteeEmail: string
  date: Date
}

async function createAppointmentEventMutation(bookingDetails: BookingDetails) {
  const meeting = await db.meeting.findFirst({
    where: { id: bookingDetails.meetingId },
    include: {
      owner: {
        include: { calendars: true },
      },
    },
  })

  if (!meeting) {
    throw new Error("An error occured: Meeting does not exist.")
  }

  const [primaryCalendar] = meeting.owner.calendars
  if (!primaryCalendar) {
    throw new Error("An error occured: Owner doesn't have a connected calendar")
  }

  const booking = await db.booking.create({
    data: {
      meeting: {
        connect: { id: bookingDetails.meetingId },
      },
      inviteeEmail: bookingDetails.inviteeEmail,
      startDateUTC: bookingDetails.date,
    },
  })

  const calendarService = await getCalendarService(primaryCalendar)
  await calendarService.createEvent({
    start: bookingDetails.date,
    durationInMilliseconds: meeting.duration * 60 * 1000,
    title: `${meeting.name} with ${bookingDetails.inviteeEmail}`,
    description: meeting.description,
    location: meeting.location,
    url: "www.kalle.app",
    organiser: {
      name: meeting.ownerName,
      email: "info@kalle.app",
    },
    owner: {
      name: bookingDetails.inviteeEmail.split("@")[0],
      email: bookingDetails.inviteeEmail,
    },
  })

  return booking
}

async function sendConfirmationMail(appointment: Appointment) {
  const startMonth = (appointment.start.getMonth() + 1).toString()
  await getEmailService().send({
    template: "confirmation",
    message: {
      to: appointment.owner.email,
      attachments: [
        {
          filename: "appointment.ics",
          content: createCalendarEvent(appointment),
        },
      ],
    },
    locals: {
      appointment: {
        ...appointment,
        start: {
          hour: appointment.start.getHours(),
          minute: appointment.start.getMinutes() === 0 ? "00" : appointment.start.getMinutes(),
          day: appointment.start.getDate(),
          month: startMonth.length === 2 ? startMonth : "0" + startMonth,
          year: appointment.start.getFullYear(),
        },
        duration: {
          hours: Math.floor(appointment.durationInMilliseconds / (60 * 1000) / 60),
          minutes: (appointment.durationInMilliseconds / (60 * 1000)) % 60,
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
    const meeting = await db.meeting.findUnique({ where: { id: bookingInfo.meetingId } })
    if (!meeting) {
      throw new NotFoundError()
    }

    const booking = await createAppointmentEventMutation({
      meetingId: meeting.id,
      inviteeEmail: bookingInfo.inviteeEmail,
      date: bookingInfo.startDate,
    })

    const meetingFromDb = await db.meeting.findUnique({
      where: { id: bookingInfo.meetingId },
      include: { owner: true },
    })
    if (!meetingFromDb) {
      throw new Error("meeting not found")
    }

    await sendConfirmationMail({
      start: bookingInfo.startDate,
      durationInMilliseconds: meeting.duration * 60 * 1000,
      title: meeting.name,
      description: meeting.description ?? "Description",
      location: meeting.location,
      url: "www.kalle.app",
      organiser: {
        name: meeting.ownerName,
        email: meetingFromDb.owner.email,
      },
      owner: {
        name: bookingInfo.inviteeEmail.split("@")[0],
        email: bookingInfo.inviteeEmail,
      },
    })

    const startTime = subMinutes(bookingInfo.startDate, bookingInfo.notificationTime)
    if (startTime > addMinutes(new Date(), 30)) {
      await reminderQueue.enqueue(booking.id, { runAt: startTime })
    }

    return booking
  }
)
