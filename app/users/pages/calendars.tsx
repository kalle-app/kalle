import Layout from "app/layouts/Layout"
import ConnectedCalendars from "app/users/components/ConnectedCalendars"
import SectionHeader from "app/users/components/SectionHeader"
import { BlitzPage, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import Card from "react-bootstrap/Card"
import SectionFooter from "app/users/components/SectionFooter"
import AddCalendarModal from "app/users/components/AddCalendar"
import Skeleton from "react-loading-skeleton"
import AuthError from "app/components/AuthError"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const CalendarList = () => {
  const [calendarEntries] = useQuery(getConnectedCalendars, null)
  const [showAddCalendarModal, setShowAddCalendarModal] = useState(false)
  return (
    <Card>
      {showAddCalendarModal && <AddCalendarModal onClose={() => setShowAddCalendarModal(false)} />}

      <SectionHeader
        title="My Calendars"
        subtitle="Add Calendars that you want to connect to Kalle"
      />
      <ConnectedCalendars
        calendars={calendarEntries ? calendarEntries : []}
        defaultCalendarId={0}
      />
      <SectionFooter
        id="add-calendar-button"
        text="Add Calendar"
        variant="primary"
        action={() => setShowAddCalendarModal(true)}
      />
    </Card>
  )
}

const CalendarsContent = () => {
  if (!useCurrentUser()) {
    return <AuthError />
  }

  return (
    <>
      <CalendarList />
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
