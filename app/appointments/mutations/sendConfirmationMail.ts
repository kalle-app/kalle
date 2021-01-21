import { getEmailService } from "../../email"
import { Appointment } from "../types"
import { createCalendarEvent } from "../utils/createCalendarEvent"

export default async function sendConfirmationMail({ appointment }: { appointment: Appointment }) {
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
          minute: appointment.start.getMinutes(),
          day: appointment.start.getDate(),
          month: appointment.start.getMonth() + 1,
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
