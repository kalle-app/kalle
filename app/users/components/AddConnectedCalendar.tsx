type AddConnectedCalendarProps = {
  handleChange: any
}

const AddConnectedCalendar = (props: AddConnectedCalendarProps) => {
  const handleCalendarInfoChanged = (e: any) => {
    const field = e.currentTarget.name
    const value = e.currentTarget.value
    props.handleChange(field, value)
  }

  return (
    <div>
      <h3>Add Calendar </h3>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-2 mb-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-6">
        <div className="col-start-1 col-end-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Calendar name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onBlur={handleCalendarInfoChanged}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-start-1 col-end-6">
          <label htmlFor="calendar_url" className="block text-sm font-medium text-gray-700">
            Calendar URL
          </label>
          <input
            type="text"
            id="calendar_url"
            name="url"
            onBlur={handleCalendarInfoChanged}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            name="type"
            onBlur={handleCalendarInfoChanged}
            defaultValue="CalDav"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>CalDav</option>
            <option>Google Calendar</option>
            <option>Outlook</option>
          </select>
        </div>

        <div className="col-start-1 col-end-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onBlur={handleCalendarInfoChanged}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-start-4 col-end-8">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onBlur={handleCalendarInfoChanged}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  )
}

export default AddConnectedCalendar
