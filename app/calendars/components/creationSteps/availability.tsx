import React from "react"
import Button from "app/users/components/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"

type AvailabilityProps = {
  toNext: any
  stepBack: any
}

const Availability = (props: AvailabilityProps) => {
  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Availability</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Specify durations and dates when the meeting could take place
        </p>
      </div>

      <div className="border-t border-gray-200">
        <div className="grid grid-cols-8 gap-6 bg-white px-4 py-5 sm:px-6">
          <div className="col-span-1">
            <Button action={() => props.stepBack()}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </Button>
          </div>

          <div className="col-start-2 col-span-6">
            <fieldset>
              <div className="col-span-2">
                <legend className="text-base font-medium text-gray-900">Duration</legend>
                <p className="text-sm text-gray-500">
                  Select the Duration that you want your meeting to be
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 mt-2">
                <div className="col-span-2 flex items-center">
                  <input
                    id="duration_quarter"
                    name="push_notifications"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="duration_quarter"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    15 min
                  </label>
                </div>
                <div className="col-span-2 flex items-center">
                  <input
                    id="duration_half"
                    name="push_notifications"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="duration_half"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    30 min
                  </label>
                </div>
                <div className="col-span-2 flex items-center">
                  <input
                    id="duration_hour"
                    name="push_notifications"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="duration_hour"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    1 hour
                  </label>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="duration_custom"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Custom Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration_custom"
                    name="duration_custom"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </fieldset>

            <div className="col-span-2 mt-5">
              <legend className="text-base font-medium text-gray-900">Timezone</legend>
              <div className="grid grid-cols-8">
                <select
                  id="timezone"
                  name="timezone"
                  className="mt-1 block col-span-2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Berlin</option>
                  <option>Stockholm</option>
                  <option>New York</option>
                </select>
              </div>
            </div>

            <div className="col-span-2 mt-5">
              <legend className="text-base font-medium text-gray-900">Select Timeslots</legend>
              <div></div>
            </div>

            <p>
              {" "}
              Timeslots (skip to kw) | only weekly view | select calendars to import and block by
              default | default select all/none | next week
            </p>
          </div>
          <div className="col-span-1">
            <Button action={() => props.toNext()}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Availability
