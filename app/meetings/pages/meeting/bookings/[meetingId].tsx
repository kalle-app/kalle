import Layout from "app/layouts/Layout"
import getBookings from "app/meetings/queries/getBookings"
import { getDateHumanFormat } from "app/time-utils/format"
import { BlitzPage, useParam, useQuery } from "blitz"
import React, { Suspense } from "react"
import { Card, Row, Col, Button, Container } from "react-bootstrap"
import Skeleton from "react-loading-skeleton"

interface BookingsProps {
  meetingId: number
}

const BookingsContent: React.FunctionComponent<BookingsProps> = ({ meetingId }) => {
  const [bookings] = useQuery(getBookings, meetingId)
  console.log(bookings)
  if (!bookings || bookings.length < 1) {
    return <p>No Bookings yet</p>
  }

  return (
    <ul>
      {bookings.map((booking) => {
        const date = new Date(booking.date)
        const dateString = getDateHumanFormat(date)
        return (
          <Card as="li" key={booking.id} id={"" + booking.id} className="p-3 my-5 text-left">
            <h5 className="pb-3 font-weight-bold">
              {dateString.dateString} at {dateString.timeString}
            </h5>
            <Row>
              <Col sm={12} className="my-auto">
                <p className="my-auto font-weight-bold">Booked by: </p>
                <p className="my-auto">{booking.inviteeEmail}</p>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button className="ml-3" variant="outline-danger">
                Cancel Meeting
              </Button>
            </div>
          </Card>
        )
      })}
    </ul>
  )
}

const Bookings: BlitzPage = () => {
  const meetingId = useParam("meetingId", "number")
  if (!meetingId) {
    return <Skeleton count={10} />
  }

  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <Container>
        <BookingsContent meetingId={meetingId} />
      </Container>
    </Suspense>
  )
}

Bookings.getLayout = (page) => <Layout title="Bookings">{page}</Layout>

export default Bookings
