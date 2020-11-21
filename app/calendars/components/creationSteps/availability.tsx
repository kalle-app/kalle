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
            duration select(radio) or input Timezone Timeslots (skip to kw) | only weekly view |
            select calendars to import and block by default | default select all/none | next week
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
