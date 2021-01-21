import { Ctx } from "blitz"
import { Meeting } from "db"
import createAppointmentEventMutation from "./createAppointmentEvent"
import sendConfirmationMail from "./sendConfirmationMail"
import { subMinutes } from "date-fns"
import reminderQueue from "../../api/queues/reminders"

interface BookingInformation {
  meeting: Meeting
  inviteeEmail: string
  meetingOwnerName: string
  startDate: Date
}

export default async function bookAppointment(bookingInfo: BookingInformation, ctx: Ctx) {
  ctx.session.authorize()

  const booking = await createAppointmentEventMutation(
    {
      meetingId: bookingInfo.meeting.id,
      inviteeEmail: bookingInfo.inviteeEmail,
      date: bookingInfo.startDate,
    },
    ctx
  )

  const appointment = {
    appointment: {
      start: bookingInfo.startDate,
      durationInMilliseconds: bookingInfo.meeting.duration * 60 * 1000,
      title: bookingInfo.meeting.name,
      description: bookingInfo.meeting.description
        ? bookingInfo.meeting.description
        : "Description",
      method: "request",
      location: "Berlin",
      url: "www.kalle.app",
      organiser: {
        name: bookingInfo.meetingOwnerName,
        email: "info@kalle.app",
      },
      owner: {
        name: bookingInfo.inviteeEmail.split("@")[0],
        email: bookingInfo.inviteeEmail,
      },
    },
  }

  await sendConfirmationMail(appointment)

  const startTime = subMinutes(bookingInfo.startDate, 30)
  await reminderQueue.enqueue(appointment, { runAt: startTime })

  return booking
}
