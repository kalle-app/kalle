import { useMutation } from "blitz"
import updateDefaultCalendar from "../mutations/updateDefaultCalendar"
import { useState } from "react"
import { DefaultCalendarSelector } from "./DefaultCalendarSelector"
import Card from "react-bootstrap/Card"
import SectionFooter from "app/users/components/SectionFooter"
import SectionHeader from "app/users/components/SectionHeader"
interface CalendarSettingsProps {
  defaultConnectedCalendarId: number
}
const initialCalendarSettings: CalendarSettingsProps = {
  defaultConnectedCalendarId: -1,
}
const CalendarSettings = () => {
  const [changeDefaultCalendar] = useMutation(updateDefaultCalendar)
  const [state, setState] = useState("")
  const [message, setMessage] = useState("")
  const [calendarSettings, setCalendarSettings] = useState(initialCalendarSettings)

  const submitSettings = async () => {
    try {
      await changeDefaultCalendar(calendarSettings.defaultConnectedCalendarId)
      setState("text-success")
      setMessage("You have successfully changed your calendar settings.")
    } catch (error) {
      setState("text-danger")
      setMessage("There was an error changing the calendar settings.")
    }
  }

  return (
    <Card className="mt-4">
      <SectionHeader title="Calendar Settings" subtitle="Change your calendar related settings" />
      <DefaultCalendarSelector
        onChange={(selectedDefaultCalendarId) => {
          setCalendarSettings({
            ...calendarSettings,
            defaultConnectedCalendarId: selectedDefaultCalendarId,
          })
        }}
        state={state}
        message={message}
      />
      <SectionFooter
        id="calendar-settings-button"
        text="Save"
        variant="primary"
        action={() => submitSettings()}
        disabled={
          !calendarSettings.defaultConnectedCalendarId ||
          calendarSettings.defaultConnectedCalendarId === -1
        }
      />
    </Card>
  )
}

export default CalendarSettings
