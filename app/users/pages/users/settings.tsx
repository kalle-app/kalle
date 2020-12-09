import Card from "app/components/Card"
import Layout from "app/layouts/Layout"
import AddConnectedCalendarModal from "app/users/components/AddConnectedCalendarModal"
import ConnectedCalendarsList from "app/users/components/ConnectedCalendarsList"
import Divider from "app/users/components/Divider"
import SectionHeader from "app/users/components/SectionHeader"
import UserDataForm from "app/users/components/UserDataForm"
import { BlitzPage, useQuery } from "blitz"
import { Suspense, useState } from "react"
import getConnectedCalendars from "../../queries/getConnectedCalendars"

const SettingsContent = () => {
  const [calendarEntries] = useQuery(getConnectedCalendars, null)
  const [modalHidden, setModelHidden] = useState(true)

  const toggleModal = () => {
    setModelHidden(!modalHidden)
  }

  return (
    <>
      <Card>
        <SectionHeader title="Personal Information" subtitle="Add your basic information here" />
        <UserDataForm />
      </Card>
      <Divider />
      <Card>
        <SectionHeader
          title="My Calendars"
          subtitle="Add Calendars that you want to connect to Kalle"
        />
        <Suspense fallback="Loading ...">
          <ConnectedCalendarsList
            calendars={calendarEntries ? calendarEntries : []}
            toggleModal={toggleModal}
          />
        </Suspense>
      </Card>
      <AddConnectedCalendarModal hidden={modalHidden} />
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
