import React, { Suspense, useState } from "react"
import Layout from "app/layouts/Layout"
import Card from "react-bootstrap/Card"
import { BlitzPage, useQuery } from "blitz"
import AddSchedule from "../components/schedules/AddScheduleModal"
import SectionHeader from "app/users/components/SectionHeader"
import SectionFooter from "app/users/components/SectionFooter"
import AllSchedules from "../components/schedules/AllSchedules"
import Skeleton from "react-loading-skeleton"

const MainContent = () => {
  const [modalVisible, showOverlay] = useState(false)
  return (
    <>
      <Card>
        <SectionHeader title="My Schedules" subtitle="View and Add new Schedule Presets" />
        <AllSchedules />
        <SectionFooter text="Add Schedule" action={() => showOverlay(true)} />
      </Card>
      <AddSchedule show={modalVisible} setVisibility={showOverlay} />
    </>
  )
}

const Schedules: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <MainContent />
    </Suspense>
  )
}

Schedules.getLayout = (page) => <Layout title="Schedules">{page}</Layout>

export default Schedules
