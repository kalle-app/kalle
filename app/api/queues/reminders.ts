import { Appointment } from "app/appointments/types"
import { getEmailService } from "app/email"
import { Queue } from "quirrel/blitz"

function asTwoDigit(n: number): string {
  const s = n.toString()
  if (s.length === 1) {
    return "0" + s
  }

  return s
}

export default Queue(
  "api/queues/reminders",
  async ({ appointment }: { appointment: Appointment }) => {
    // We create new dates here because date currently is not serialized properly on enqueuing
    const start = new Date(appointment.start)
    await getEmailService().send({
      template: "notification",
      message: {
        to: appointment.owner.email,
      },
      locals: {
        appointment: {
          ...appointment,
          start: {
            hour: start.getHours(),
            minute: asTwoDigit(start.getMinutes()),
            day: start.getDate(),
            month: start.getMonth() + 1,
            year: start.getFullYear(),
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
