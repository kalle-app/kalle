import React from "react"
import Button from "app/users/components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"

type AdvancedProps = {
  stepBack: () => void
  onEdit: (key: string, value: any) => void
  onSubmit: (e: any) => void
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
          <div className="col-start-2 col-span-6">Coming soon...</div>
          <div className="col-start-1 col-span-8"></div>
          <div className="col-start-8 mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#"
                onClick={props.onSubmit}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Submit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advanced
