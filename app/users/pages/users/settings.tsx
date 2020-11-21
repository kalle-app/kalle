import ConnectedCalendarsList from "app/users/components/connectedCalendarsList"
import Divider from "app/users/components/divider"
import AddCalendarModal from "app/users/components/addCalendarModal"
import Section from "app/users/components/section"
import UserData from "app/users/components/userData"
import getConnectedCalendars from "../../queries/getConnectedCalendars"
import { BlitzPage, useQuery } from "blitz"
import { Suspense, useState } from "react"

const Settings = () => {
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
      <AddCalendarModal hidden={modalHidden} updateCalendarList={handleCalendarAdded} />
    </div>
  )
}

const Calendars: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Settings />
    </Suspense>
  )
}

export default Calendars
