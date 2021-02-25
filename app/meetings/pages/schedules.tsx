import React, { Suspense, useState } from "react"
import Layout from "app/layouts/Layout"
import Card from "react-bootstrap/Card"
import { BlitzPage } from "blitz"
import AddSchedule from "../components/schedules/AddScheduleModal"
import SectionHeader from "app/users/components/SectionHeader"
import SectionFooter from "app/users/components/SectionFooter"
import AllSchedules from "../components/schedules/AllSchedules"
import Skeleton from "react-loading-skeleton"

const Schedules: BlitzPage = () => {
  const [modalVisible, showOverlay] = useState(false)

  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <Card>
        <SectionHeader
          title="My Schedules"
          subtitle="A schedule describes when you are generally available. No meeting can be booked outsite of those time windows."
        />
        <AllSchedules />
        <SectionFooter
          variant="primary"
          id="add-schedule-footer"
          text="Add Schedule"
          action={() => showOverlay(true)}
        />
      </Card>
      <AddSchedule show={modalVisible} setVisibility={showOverlay} />
    </Suspense>
  )
}

Schedules.authenticate = true
Schedules.getLayout = (page) => <Layout title="Schedules">{page}</Layout>

export default Schedules
