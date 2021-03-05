import db from "db"
const bcrypt = require("bcrypt")

export default async function verifyCancelCode({ bookingId, cancelCode }) {
  const booking = await db.booking.findFirst({
    where: { id: bookingId },
  })

  if (!booking) {
    return false
  }

  const isCodeValid = await bcrypt.compare(cancelCode, booking.cancelCode)

  return isCodeValid
}
