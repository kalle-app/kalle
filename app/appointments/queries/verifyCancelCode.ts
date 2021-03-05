import db from "db"
const bcrypt = require("bcrypt")

const saltRounds = 10

export default async function verifyCancelCode(bookingId: number, cancelCode: String) {
  const booking = await db.booking.findFirst({
    where: { id: bookingId },
  })

  if (!booking) {
    return false
  }

  const isCodeValid = await bcrypt.compare(cancelCode, booking.cancelCode)

  return isCodeValid
}
