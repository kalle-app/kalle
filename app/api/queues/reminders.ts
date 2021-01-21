import { Appointment } from "app/appointments/types"
import { getEmailService } from "app/email"
import { Queue } from "quirrel/blitz"

export default Queue(
  "api/queues/reminders",
  async ({ appointment }: { appointment: Appointment }) => {
    await getEmailService().send({
      template: "notification",
      message: {
        to: appointment.owner.email,
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
        },
      },
    })
  }
)
