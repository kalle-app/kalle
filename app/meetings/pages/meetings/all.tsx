import { BlitzPage, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import getMeetings from "../../../meetings/queries/getMeetings"
import MyMeetings from "../../components/myMeetings"

const MyMeetingsContent = () => {
  const [meetings] = useQuery(getMeetings, null)

  return <MyMeetings meetings={meetings ? meetings : []} />
}

const Create: BlitzPage = () => {
  // display all meetings I invited to as cards here
  // Customer can click on a meeting and info will be diplayed
  return (
    <div className="bg-gray-100 flex h-screen">
      <div className="container flex flex-col justify-center mx-auto">
        <Suspense fallback="Loading...">
          <MyMeetingsContent />
        </Suspense>
      </div>
    </div>
  )
}

export default Create
