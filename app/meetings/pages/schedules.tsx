import React, { Suspense, useState } from "react"
import Layout from "app/layouts/Layout"
import Card from "react-bootstrap/Card"
import { BlitzPage, useQuery } from "blitz"
import AddSchedule from "../components/schedules/AddScheduleModal"
import SectionHeader from "app/users/components/SectionHeader"
import SectionFooter from "app/users/components/SectionFooter"

const MainContent = () => {
  const [modalVisible, showOverlay] = useState(false)
  return (
    <>
      <Card>
        <SectionHeader title="My Schedules" subtitle="View and Add new Schedules" />
        <Suspense fallback="Loading ..."></Suspense>
        <SectionFooter text="Add Schedule" action={() => showOverlay(true)} />
      </Card>
      <AddSchedule show={modalVisible} setVisibility={showOverlay} />
    </>
  )
}

const Schedules: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <MainContent />
    </Suspense>
  )
}

Schedules.getLayout = (page) => <Layout title="Schedules">{page}</Layout>

export default Schedules
