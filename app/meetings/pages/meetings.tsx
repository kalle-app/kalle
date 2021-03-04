import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useQuery } from "blitz"
import React, { Suspense } from "react"
import getMeetings from "../queries/getMeetings"
import Meetings from "../components/Meetings"
import Button from "react-bootstrap/Button"
import Skeleton from "react-loading-skeleton"
import { Col, Row } from "react-bootstrap"

const MeetingsContent = () => {
  const [meetings] = useQuery(getMeetings, null)
  return <Meetings meetings={meetings ? meetings : []} />
}

const MyMeetings: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <Row className="mb-3">
        <Col md={8} className="text-left">
          <h3>Your Meetings</h3>
        </Col>
        <Col md={4} className="text-md-right text-sm-left">
          <Link href="/meeting/create">
            <Button variant="success">Create new Meeting</Button>
          </Link>
        </Col>
      </Row>
      <MeetingsContent />
    </Suspense>
  )
}

MyMeetings.authenticate = true
MyMeetings.getLayout = (page) => <Layout title="Meetings | Kalle">{page}</Layout>

export default MyMeetings
