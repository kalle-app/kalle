import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useQuery } from "blitz"
import React, { Suspense } from "react"
import getMeetings from "../queries/getMeetings"
import Meetings from "../components/Meetings"
import Button from "react-bootstrap/Button"
import Skeleton from "react-loading-skeleton"
import AuthError from "app/components/AuthError"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Col, Row } from "react-bootstrap"

const MeetingsContent = () => {
  const [meetings] = useQuery(getMeetings, null)
  return <Meetings meetings={meetings ? meetings : []} />
}

const MainContent = () => {
  if (!useCurrentUser()) {
    return <AuthError />
  }
  return (
    <div className="">
      <Row className="mb-3">
        <Col md={8} className="text-left">
          <h3>Your Meetings</h3>
        </Col>
        <Col md={4} className="text-md-right text-sm-left">
          <Link href="/meeting/create">
            <Button variant="primary">Create new Meeting</Button>
          </Link>
        </Col>
      </Row>
      <MeetingsContent />
    </div>
  )
}

const MyMeetings: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <MainContent />
    </Suspense>
  )
}

MyMeetings.getLayout = (page) => <Layout title="Meetings | Kalle">{page}</Layout>

export default MyMeetings
