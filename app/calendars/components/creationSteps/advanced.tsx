import React from "react"
import Button from "app/users/components/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"

type AdvancedProps = {
  stepBack: any
}

const Advanced = (props: AdvancedProps) => {
  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Advanced Options</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Specify advanced Options for you meeting
        </p>
      </div>

      <div className="border-t border-gray-200">
        <div className="grid grid-cols-8 gap-6 bg-white px-4 py-5 sm:px-6">
          <div className="col-span-1">
            <Button action={() => props.stepBack()}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </Button>
          </div>
          <div className="col-start-2 col-span-6">Add contact details ...</div>
        </div>
      </div>
    </div>
  )
}

export default Advanced
