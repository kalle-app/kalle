import { BlitzPage, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import { Card, Container } from "react-bootstrap"
import getAvailableSlots from "../queries/getAvailableSlots"

const Scheduler = () => {
  const [availableSlots, { refetch }] = useQuery(getAvailableSlots, null)
  const [selected, setSelected] = useState()

  const onSubmit = (e: any) => {
    // Send selected to calendar owner
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </Container>
  )
}

const ScheduleAppointment: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Scheduler />
    </Suspense>
  )
}

export default ScheduleAppointment
