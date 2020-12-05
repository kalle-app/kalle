import { EmailProvider } from "../helper/emailHelper"
import { createCalendarEvent } from "../helper/createCalendarEvent"
import Email from "email-templates"
import { appointment } from "../types"

export default async function sendConfirmationMail(properties: { appointment: appointment; }) {
  //const mail = getMailService();
  const mail = EmailProvider.Connection;
  sendMail(mail, properties.appointment);
}

function sendMail(mail: Email, appointment: appointment): void {
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
