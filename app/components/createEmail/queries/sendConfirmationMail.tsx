import { EmailProvider } from "../helper/emailHelper"
import { createCalendarEvent } from "../helper/createCalendarEvent"
import Email from "email-templates"
import { Appointment } from "../types"

export default async function sendConfirmationMail(properties: { appointment: Appointment; }) {
  const mail = EmailProvider.Connection;
  sendMail(mail, properties.appointment);
}

function sendMail(mail: Email, appointment: Appointment): void {
  mail
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
