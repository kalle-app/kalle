import EmailFactory from "../EmailFactory"
import { buildCalendarEvent } from "../helper/createCalendarEvent"

export class EmailConfirmation extends EmailFactory {
  appointment: any
  constructor(appointment) {
    super()
    this.appointment = appointment
  }

  buildEmail(): any {
    this.email
      .send({
        template: "confirmation",
        message: {
          to: this.appointment.owner.email,
          attachments: [
            {
              filename: "appointment.ics",
              content: buildCalendarEvent(this.appointment),
            },
          ],
        },

        locals: {
          appointment: this.appointment,
        },
      })
      .then(console.log)
      .catch(console.error)
  }
}
