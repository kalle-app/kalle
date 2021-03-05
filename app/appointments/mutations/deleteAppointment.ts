import db from "db"
import verifyCancelCode from "../queries/verifyCancelCode"

export default async function deleteAppointmentMutation(bookingId: number, cancelCode: String) {
  const cancelCodeValid = await verifyCancelCode(bookingId, cancelCode)
  if (!!cancelCodeValid) {
    throw Error("Invalid Cancellationcode given")
  }

  await db.booking.delete({
    where: { id: bookingId },
  })

  // send confirmation mail
}
