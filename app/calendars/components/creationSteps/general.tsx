import Button from "app/users/components/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

type GeneralProps = {
  toNext: any
}

const General = (props: GeneralProps) => {
  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">General Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Add basic information about the Meeting you want so schedule
        </p>
      </div>

      <div className="border-t border-gray-200">
        <div className="grid grid-cols-8 gap-6 bg-white px-4 py-5 sm:px-6">
          <div className="col-start-2 col-span-6">name Meeting link Description Location</div>
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

export default General
