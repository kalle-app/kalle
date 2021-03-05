import deleteAppointmentMutation from "app/appointments/mutations/deleteAppointment"
import verifyCancelCode from "app/appointments/queries/verifyCancelCode"
import { BlitzPage, useMutation, useParam, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import Skeleton from "react-loading-skeleton"

const PageContent = ({ bookingId, cancelCode }) => {
  const [isCodeValid] = useQuery(verifyCancelCode, { bookingId, cancelCode })
  const [deleteAppointment] = useMutation(deleteAppointmentMutation)
  const [finished, setFinished] = useState(false)

  const cancelBooking = async () => {
    await deleteAppointment({ bookingId, cancelCode })
    setFinished(true)
  }

  if (finished) {
    return (
      <>
        <h4>Your booking was successfully cancelled</h4>
      </>
    )
  } else {
    if (isCodeValid) {
      return (
        <Card>
          <Card.Header>Cancel Booking</Card.Header>
          <Card.Body>
            <Row>
              <Col>Are you sure you want to cancel your booking?</Col>
            </Row>
            <Row className="justify-content-end">
              <Col>
                <Button
                  onClick={() => {
                    cancelBooking()
                  }}
                  variant="primary"
                  id="submit"
                  className="m-1 float-right"
                >
                  Cancel booking
                </Button>
              </Col>
            </Row>
          </Card.Body>
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
  const bookingId = useParam("bookingID", "number")
  const cancelCode = useParam("cancelCode", "string")

  if (!bookingId || !cancelCode) {
    return <Skeleton count={10} />
  }
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <Container className="pt-5">
        <PageContent bookingId={bookingId} cancelCode={cancelCode} />
      </Container>
    </Suspense>
  )
}

export default CancelBooking
