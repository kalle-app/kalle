import { sendEmail } from "../helper/emailHelper"
import { createCalendarEvent } from "../helper/createCalendarEvent"
import Email from "email-templates"
import { appointment } from "../types"

export default async function sendConfirmationMail(properties) {
  const email = sendEmail()
  buildConfirmationMail(email, properties.appointment)
}

function buildConfirmationMail(email: Email, appointment: appointment): void {
  email
    .send({
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
    .then(console.log)
    .catch(console.error)
}
