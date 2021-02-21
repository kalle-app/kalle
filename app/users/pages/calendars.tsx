import Layout from "app/layouts/Layout"
import CalendarSettings from "app/users/components/CalendarSettings"
import { BlitzPage } from "blitz"
import React, { Suspense } from "react"
import Skeleton from "react-loading-skeleton"
import AuthError from "app/components/AuthError"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import MyCalendars from "app/users/components/MyCalendars"
const CalendarsSettings = () => {
  return (
    <div>
      <MyCalendars />
      <CalendarSettings />
    </div>
  )
}

const CalendarsContent = () => {
  if (!useCurrentUser()) {
    return <AuthError />
  }

  return (
    <>
      <CalendarsSettings />
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

Calendars.getLayout = (page) => <Layout title="Calendars | Kalle">{page}</Layout>

export default Calendars
