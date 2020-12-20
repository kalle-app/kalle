import Layout from "app/layouts/Layout"
import { BlitzPage, useQuery } from "blitz"
import React, { Suspense } from "react"
import getMeetings from "../queries/getMeetings"
import Meetings from "../components/Meetings"
import Button from "react-bootstrap/Button"

const MeetingsContent = () => {
  const [meetings] = useQuery(getMeetings, null)
  return <Meetings meetings={meetings ? meetings : []} />
}

const MainContent = () => {
  // display all meetings I invited to as cards here
  // Customer can click on a meeting and info will be displayed
  return (
    <div className="text-center">
      <h3>All your active Meetings</h3>
      <Suspense fallback="Loading...">
        <MeetingsContent />
      </Suspense>
      <Button href="/meeting/create" variant="primary" className="m-3">
        Create new Meeting
      </Button>
    </div>
  )
}

const MyMeetings: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <MainContent />
    </Suspense>
  )
}

MyMeetings.getLayout = (page) => <Layout title="Meetings">{page}</Layout>

export default MyMeetings
