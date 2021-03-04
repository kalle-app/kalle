import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
import React, { Suspense } from "react"

import Skeleton from "react-loading-skeleton"
import MyCalendars from "app/users/components/MyCalendars"
import CalendarSettings from "app/users/components/CalendarSettings"

const CalendarOverview = () => {
  return (
    <>
      <MyCalendars />
      <CalendarSettings />
    </>
  )
}

const CalendarsContent = () => {
  return (
    <>
      <CalendarOverview />
    </>
  )
}

const Calendars: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <CalendarsContent />
    </Suspense>
  )
}

Calendars.authenticate = true
Calendars.getLayout = (page) => <Layout title="Calendars | Kalle">{page}</Layout>

export default Calendars
