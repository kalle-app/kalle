import Button from "./Button"
import addConnectedCalendar from "../mutations/addConnectedCalendar"
import AddConnectedCalendar from "./AddConnectedCalendar"
import { useState } from "react"
import { invalidateQuery, useMutation } from "blitz"
import authenticateConnectedCalendar from "../queries/authenticateConnectedCalendar"
import getConnectedCalendars from "../queries/getConnectedCalendars"

const initialCalendar = {
  name: "",
  type: "CalDav",
  url: "",
  username: "",
  password: "",
}

interface AddCalendarProps {
  hidden: boolean
}

const AddConnectedCalendarModal = (props: AddCalendarProps) => {
  const [calendar, setCalendar] = useState(initialCalendar)
  const [createCalendarMutation] = useMutation(addConnectedCalendar)

  const handleCalenderInfoChanged = (field: string, value: any) => {
    setCalendar({
      ...calendar,
      [field]: value,
    })
  }

  const onSubmit = async () => {
    switch (calendar.type) {
      case "CalDav":
        const response = await authenticateConnectedCalendar({
          url: calendar.url,
          username: calendar.username,
          password: calendar.password,
        })
        if (response.fail !== null) {
          alert("Invalid Credentials")
          return
        }
        break
      default:
        alert("Calendartype not supported")
        return
    }

    try {
      await createCalendarMutation(calendar)
      await invalidateQuery(getConnectedCalendars)
    } catch (error) {
      alert("Error saving project")
    }
  }

  if (props.hidden) {
    return <div></div>
  }

  return (
    <div
      className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <AddConnectedCalendar handleChange={handleCalenderInfoChanged} />
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button onClick={onSubmit} type="submit">
              Add Calendar
            </Button>
            <button
              type="button"
              className="mt-3 mx-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddConnectedCalendarModal
