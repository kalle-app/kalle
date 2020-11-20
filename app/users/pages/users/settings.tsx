import ConnectedCalendarsList from "app/users/components/connectedCalendarsList"
import Divider from "app/users/components/divider"
import Section from "app/users/components/section"
import UserData from "app/users/components/userData"
import { BlitzPage, useQuery } from "blitz"
import { Suspense } from "react"

const Calendars: BlitzPage = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto ">
        <Section title="Personal Information" subtitle="Add your basic information here">
          <UserData />
        </Section>

        <Divider />

        <Section title="My Calendars" subtitle="Add Calendars that you want to connect to Kalle">
          <Suspense fallback="Loading ...">
            <ConnectedCalendarsList />
          </Suspense>
        </Section>
      </div>
    </div>
  )
}

export default Calendars
