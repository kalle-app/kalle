import { Ctx } from "blitz"
import db, { Meeting } from "db"
import createAppointmentEventMutation from "./createAppointmentEvent"
import sendConfirmationMail from "./sendConfirmationMail"
import { subMinutes } from "date-fns"
import reminderQueue from "../../api/queues/reminders"

interface BookingInformation {
  meeting: Meeting
  inviteeEmail: string
  meetingOwnerName: string
  startDate: Date
  notificationTime: number
}

export default async function bookAppointment(bookingInfo: BookingInformation, ctx: Ctx) {
  const booking = await createAppointmentEventMutation(
    {
      meetingId: bookingInfo.meeting.id,
      inviteeEmail: bookingInfo.inviteeEmail,
      date: bookingInfo.startDate,
    }
  )

  const meetingFromDb = await db.meeting.findUnique({
    where: { id: bookingInfo.meeting.id },
    include: { owner: true },
  })
  if (!meetingFromDb) {
    throw new Error("meeting not found")
  }

  const appointment = {
    appointment: {
      start: bookingInfo.startDate,
      durationInMilliseconds: bookingInfo.meeting.duration * 60 * 1000,
      title: bookingInfo.meeting.name,
      description: bookingInfo.meeting.description ?? "Description",
      method: "request",
      location: bookingInfo.meeting.location,
      url: "www.kalle.app",
      organiser: {
        name: bookingInfo.meetingOwnerName,
        email: meetingFromDb.owner.email,
      },
      owner: {
        name: bookingInfo.inviteeEmail.split("@")[0],
        email: bookingInfo.inviteeEmail,
      },
    },
  }

  await sendConfirmationMail(appointment)

  const startTime = subMinutes(bookingInfo.startDate, bookingInfo.notificationTime)
  await reminderQueue.enqueue(appointment, { runAt: startTime })

  return booking
}
