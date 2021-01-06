import { createEvent } from "app/caldav"
import { Ctx } from "blitz"
import db from "db"
import passwordEncryptor from "app/users/password-encryptor"

interface BookingDetails {
  meetingId: number
  inviteeEmail: string
  date: Date
}

export default async function bookAppointmentMutation(bookingDetails: BookingDetails, ctx: Ctx) {
  console.log("ok")
  ctx.session.authorize()

  const meeting = await db.meeting.findFirst({
    where: { id: bookingDetails.meetingId },
  })

  if (!meeting) {
    throw new Error("An error occured: Meeting does not exist.")
  }

  const booking = await db.booking.create({
    data: {
      meeting: {
        connect: { id: bookingDetails.meetingId },
      },
      inviteeEmail: bookingDetails.inviteeEmail,
      date: bookingDetails.date,
    },
  })

  const meetingOwner = await db.user.findFirst({
    where: { username: meeting.ownerName },
  })

  if (!meetingOwner) return null

  const calendar = await db.connectedCalendar.findFirst({
    where: { ownerId: meetingOwner.id },
  })
  if (!calendar) return null

  const password = await passwordEncryptor.decrypt(calendar.encryptedPassword)

  createEvent({
    url: calendar.caldavAddress,
    auth: { username: calendar.username, password, digest: true },
  })

  return booking
}
