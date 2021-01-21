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
            // We create new dates here because date currently is not serialized properly on enqueuing
            hour: new Date(appointment.start).getHours(),
            minute: new Date(appointment.start).getMinutes(),
            day: new Date(appointment.start).getDate(),
            month: new Date(appointment.start).getMonth() + 1,
            year: new Date(appointment.start).getFullYear(),
          },
          duration: {
            hours: Math.floor(appointment.durationInMilliseconds / (60 * 1000) / 60),
            minutes: (appointment.durationInMilliseconds / (60 * 1000)) % 60,
          },
        },
      },
    })
  }
)
