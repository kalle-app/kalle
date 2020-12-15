import { PrimaryLink } from "app/components/Links"
import Layout from "app/layouts/Layout"
import { BlitzPage, useQuery } from "blitz"
import React, { Suspense } from "react"
import getMeetings from "../../../meetings/queries/getMeetings"
import Meetings from "../../components/Meetings"

const MyMeetingsContent = () => {
  const [meetings] = useQuery(getMeetings, null)

  return <Meetings meetings={meetings ? meetings : []} />
}

const MainContent = () => {
  // display all meetings I invited to as cards here
  // Customer can click on a meeting and info will be displayed
  return (
    <div className="container flex flex-col items-center">
      <h1 className="flex-grow-0">All your active Meetings</h1>
      <h3 className="flex-grow-0">
        People with the link to those meetings can schedule a time slot with you.
      </h3>
      <Suspense fallback="Loading...">
        <MyMeetingsContent />
      </Suspense>
      <PrimaryLink className="flex-grow-0" href="/meetings/create">
        Create new Meeting
      </PrimaryLink>
    </div>
  )
}

const All: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <MainContent />
    </Suspense>
  )
}

All.getLayout = (page) => <Layout title="Kalle Meetings">{page}</Layout>

export default All
