import { BlitzPage, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import getMeetings from "../../../meetings/queries/getMeetings"
import MyMeetings from "../../components/myMeetings"

const Create: BlitzPage = () => {
  const [meetings] = useQuery(getMeetings, null)

  // display all meetings I invited to here
  // Customer can click on a meeting and info will be diplayed
  return (
    <div className="bg-gray-100 flex h-screen">
      <div className="container flex flex-col justify-center mx-auto">
        <Suspense fallback="Loading...">
          <MyMeetings meetings={meetings ? meetings : []} />
        </Suspense>
      </div>
    </div>
  )
}

export default Create
