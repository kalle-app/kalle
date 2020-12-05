import ConnectedCalendarsList from "app/users/components/ConnectedCalendarsList"
import Divider from "app/users/components/Divider"
import AddConnectedCalendarModal from "app/users/components/AddConnectedCalendarModal"
import Section from "app/users/components/Section"
import UserData from "app/users/components/UserData"
import getConnectedCalendars from "../../queries/getConnectedCalendars"
import { BlitzPage, useQuery } from "blitz"
import { Suspense, useState } from "react"

const SettingsContent = () => {
  const [calendarEntries, { refetch }] = useQuery(getConnectedCalendars, null)
  const [modalHidden, setModelHidden] = useState(true)

  const handleCalendarAdded = () => {
    refetch()
  }

  const toggleModal = () => {
    setModelHidden(!modalHidden)
  }

  return (
    <div className="bg-gray-100 py-10 fixed z-10 inset-0 overflow-y-auto">
      <div className="container mx-auto ">
        <Section title="Personal Information" subtitle="Add your basic information here">
          <UserData />
        </Section>

        <Divider />

        <Section title="My Calendars" subtitle="Add Calendars that you want to connect to Kalle">
          <Suspense fallback="Loading ...">
            <ConnectedCalendarsList
              calendars={calendarEntries ? calendarEntries : []}
              toggleModal={toggleModal}
            />
          </Suspense>
        </Section>
      </div>
      <AddConnectedCalendarModal hidden={modalHidden} updateCalendarList={handleCalendarAdded} />
    </div>
  )
}

const Settings: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <SettingsContent />
    </Suspense>
  )
}

export default Settings
