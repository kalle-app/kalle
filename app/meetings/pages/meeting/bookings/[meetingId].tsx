import Layout from "app/layouts/Layout"
import cancelBookingMutation from "app/meetings/mutations/cancelBooking"
import getBookings from "app/meetings/queries/getBookings"
import getMeetingById from "app/meetings/queries/getMeetingById"
import { BlitzPage, invalidateQuery, useMutation, useParam, useQuery } from "blitz"
import { format } from "date-fns"
import React, { Suspense, useState } from "react"
import { Card, Row, Col, Button, Container, Modal } from "react-bootstrap"
import Skeleton from "react-loading-skeleton"

const BookingsContent = () => {
  const meetingId = useParam("meetingId", "number")!

  const [meeting] = useQuery(getMeetingById, meetingId)
  const [bookings] = useQuery(getBookings, meetingId)
  const [cancelBooking] = useMutation(cancelBookingMutation)
  const [selectedBooking, setSelectedBooking] = useState<number>()
  const [cancelModalVisible, setCancelModalVisible] = useState(false)

  const setCancelModal = (bookingId: number) => {
    setSelectedBooking(bookingId)
    setCancelModalVisible(true)
  }

  if (bookings.length < 1) return <p>No Bookings yet</p>

  return (
    <>
      <h1>Bookings for "{meeting?.name}"</h1>
      <p>{meeting?.description}</p>
      <Row style={{ display: "flex", flexWrap: "wrap" }}>
        {bookings.map((booking) => {
          const dateString = format(new Date(booking.startDateUTC), "iiii, dd. LLLL y - H:mm")
          return (
            <Col
              key={booking.id + "bookingView"}
              sm={6}
              lg={4}
              style={{ display: "flex" }}
              className="my-1"
            >
              <Card
                id={"" + booking.id}
                className="p-3 my-2 text-left shadow"
                style={{ width: "100%" }}
              >
                <h5 className="pb-3 font-weight-bold">{dateString}</h5>
                <Row>
                  <Col sm={12} className="my-auto">
                    <p className="my-auto font-weight-bold">Booked by: </p>
                    <p className="my-auto">{booking.inviteeEmail}</p>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                  <Button
                    className="mt-3"
                    onClick={() => {
                      setCancelModal(booking.id)
                    }}
                    variant="outline-danger"
                  >
                    Cancel Appointment
                  </Button>
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>
      <Modal
        show={cancelModalVisible}
        onHide={() => {
          setCancelModalVisible(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this appointment?
          <Button
            className="mt-3 float-right"
            variant="primary"
            onClick={async () => {
              await cancelBooking(selectedBooking)
              await invalidateQuery(getBookings)
              setCancelModalVisible(false)
            }}
            id="submit"
          >
            Cancel Appointment
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

const Bookings: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <Container>
        <BookingsContent />
      </Container>
    </Suspense>
  )
}

Bookings.authenticate = true
Bookings.getLayout = (page) => <Layout title="Bookings">{page}</Layout>

export default Bookings
