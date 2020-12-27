import { getEmailService } from "../helper/emailHelper"
import { createCalendarEvent } from "../helper/createCalendarEvent"
import { Appointment } from "../types"

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
      appointment: appointment,
    },
  })
}
