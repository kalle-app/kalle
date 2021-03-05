import deleteAppointmentMutation from "app/appointments/mutations/deleteAppointment"
import verifyCancelCode from "app/appointments/queries/verifyCancelCode"
import { BlitzPage, useMutation, useParam, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import { Button, Card } from "react-bootstrap"
import Skeleton from "react-loading-skeleton"

const PageContent = ({ bookingId, cancelCode }) => {
  const [isCodeValid] = useQuery(verifyCancelCode, bookingId, cancelCode)
  const [deleteAppointment] = useMutation(deleteAppointmentMutation)
  const [finished, setFinished] = useState(false)

  const cancelBooking = async () => {
    await deleteAppointment(bookingId, cancelCode)
    setFinished(true)
  }

  if (finished) {
    return (
      <Card>
        <h4>Your booking was successfully cancelled</h4>
      </Card>
    )
  } else {
    if (isCodeValid) {
      return (
        <Card>
          Are you sure you want to cancel your booking?
          <Button
            onClick={() => {
              cancelBooking()
            }}
            variant="primary"
            id="submit"
            className="m-1"
          >
            Cancel booking
          </Button>
        </Card>
      )
    } else {
      return (
        <Card>
          <h4>Sorry, the link you entered is invalid</h4>
        </Card>
      )
    }
  }
}

const CancelBooking: BlitzPage = () => {
  const bookingId = useParam("bookingId", "number")
  const cancelCode = useParam("cancelCode", "string")

  if (!bookingId || !cancelCode) {
    return <Skeleton count={10} />
  }
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <PageContent bookingId={bookingId} cancelCode={cancelCode} />
    </Suspense>
  )
}

export default CancelBooking
