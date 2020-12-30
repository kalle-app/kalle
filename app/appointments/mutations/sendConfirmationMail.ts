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
      appointment: appointment,
    },
  })
}
