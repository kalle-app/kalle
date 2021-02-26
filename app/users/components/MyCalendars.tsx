import ConnectedCalendars from "app/users/components/ConnectedCalendars"
import SectionHeader from "app/users/components/SectionHeader"
import { useQuery } from "blitz"
import React, { useState } from "react"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import Card from "react-bootstrap/Card"
import SectionFooter from "app/users/components/SectionFooter"
import AddCalendarModal from "app/users/components/AddCalendar"

const MyCalendars = () => {
  const [calendarEntries] = useQuery(getConnectedCalendars, null)
  const [showAddCalendarModal, setShowAddCalendarModal] = useState(false)

  return (
    <Card>
      {showAddCalendarModal && <AddCalendarModal onClose={() => setShowAddCalendarModal(false)} />}

      <SectionHeader
        title="My Calendars"
        subtitle="Add Calendars that you want to connect to Kalle. These could be your private calendars or your calendars from work. We currently support CalDav, Google Calendar and Microsoft Outlook Calendars"
      />
      <ConnectedCalendars calendars={calendarEntries ? calendarEntries : []} />
      <SectionFooter
        id="add-calendar-button"
        text="Add Calendar"
        variant="primary"
        action={() => setShowAddCalendarModal(true)}
      />
    </Card>
  )
}

export default MyCalendars
