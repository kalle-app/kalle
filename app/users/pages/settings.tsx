import Layout from "app/layouts/Layout"
import ConnectedCalendars from "app/users/components/ConnectedCalendars"
import SectionHeader from "app/users/components/SectionHeader"
import UserDataForm from "app/users/components/UserDataForm"
import { BlitzPage, useQuery, useMutation, useRouter } from "blitz"
import React, { Suspense, useState } from "react"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import Card from "react-bootstrap/Card"
import SectionFooter from "app/users/components/SectionFooter"
import AddCalendarModal from "app/users/components/AddCalendar"
import Skeleton from "react-loading-skeleton"
import AuthError from "app/components/AuthError"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import deleteUserMutation from "../mutations/deleteUser"
import logoutMutation from "app/auth/mutations/logout"
import getDefaultCalendarByUser from "../queries/getDefaultCalendarByUser"

const CalendarList = () => {
  const [calendarEntries] = useQuery(getConnectedCalendars, null)
  const [defaultCalendarId] = useQuery(getDefaultCalendarByUser, null)
  const [showAddCalendarModal, setShowAddCalendarModal] = useState(false)

  return (
    <Card className="mt-4">
      {showAddCalendarModal && <AddCalendarModal onClose={() => setShowAddCalendarModal(false)} />}

      <SectionHeader
        title="My Calendars"
        subtitle="Add Calendars that you want to connect to Kalle"
      />
      <ConnectedCalendars calendars={calendarEntries ? calendarEntries : []} defaultCalendarId={defaultCalendarId} />
      <SectionFooter
        id="add-calendar-button"
        text="Add Calendar"
        variant="primary"
        action={() => setShowAddCalendarModal(true)}
      />
    </Card>
  )
}

const PersonalInformation = () => {
  return (
    <Card className="mt-4">
      <SectionHeader title="Personal Information" subtitle="Change your account information here" />
      <UserDataForm />
      <SectionFooter text="Update Information" variant="primary" action={() => alert("Test")} />
    </Card>
  )
}

const DangerZone = () => {
  const router = useRouter()
  const [deleteUser] = useMutation(deleteUserMutation)
  const [logout] = useMutation(logoutMutation)
  const user = useCurrentUser()

  const submitDeletion = async () => {
    const calendar = await deleteUser(user?.id)
    await logout()
    router.push("/")
  }

  return (
    <Card className="mt-4">
      <SectionHeader title="Danger Zone" subtitle="Delete your account and all associated data" />
      <SectionFooter text="Delete your Account" variant="danger" action={() => submitDeletion()} />
    </Card>
  )
}

const SettingsContent = () => {
  if (!useCurrentUser()) {
    return <AuthError />
  }

  return (
    <>
      <CalendarList />
      <PersonalInformation />
      <DangerZone />
    </>
  )
}

const Settings: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <SettingsContent />
    </Suspense>
  )
}

Settings.getLayout = (page) => <Layout title="Settings">{page}</Layout>

export default Settings
