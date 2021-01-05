import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useQuery } from "blitz"
import React, { Suspense } from "react"
import getMeetings from "../queries/getMeetings"
import Meetings from "../components/Meetings"
import Button from "react-bootstrap/Button"
import Skeleton from "react-loading-skeleton"

const MeetingsContent = () => {
  const [meetings] = useQuery(getMeetings, null)
  return <Meetings meetings={meetings ? meetings : []} />
}

const MainContent = () => {
  return (
    <div className="text-center">
      <h3>All your active Meetings</h3>
      <MeetingsContent />
      <Link href="/meeting/create">
        <Button variant="primary" className="m-3">
          Create new Meeting
        </Button>
      </Link>
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

MyMeetings.getLayout = (page) => <Layout title="Meetings">{page}</Layout>

export default MyMeetings
