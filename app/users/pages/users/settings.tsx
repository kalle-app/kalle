import Layout from "app/layouts/Layout"
import ConnectedCalendars from "app/users/components/ConnectedCalendars"
import SectionHeader from "app/users/components/SectionHeader"
import UserDataForm from "app/users/components/UserDataForm"
import { BlitzPage, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import getConnectedCalendars from "../../queries/getConnectedCalendars"
import Card from "react-bootstrap/Card"
import SectionFooter from "app/users/components/SectionFooter"
import AddCalendar from "app/users/components/AddCalendar"

const SettingsContent = () => {
  const [calendarEntries] = useQuery(getConnectedCalendars, null)
  const [state, showOverlay] = useState(false)

  return (
    <>
      <Card>
        <SectionHeader
          title="My Calendars"
          subtitle="Add Calendars that you want to connect to Kalle"
        />
        <Suspense fallback="Loading ...">
          <ConnectedCalendars calendars={calendarEntries ? calendarEntries : []} />
        </Suspense>
        <SectionFooter text="Add Calendar" action={() => showOverlay(true)} />
      </Card>
      <Card className="mt-4">
        <SectionHeader
          title="Personal Information"
          subtitle="Change your account information here"
        />
        <UserDataForm />
        <SectionFooter text="Update" action={() => alert("Test")} />
      </Card>
      <AddCalendar state={state} showOverlay={showOverlay} />
    </>
  )
}

const Settings: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <SettingsContent />
    </Suspense>
  )
}

Settings.getLayout = (page) => <Layout title="Settings">{page}</Layout>

export default Settings
