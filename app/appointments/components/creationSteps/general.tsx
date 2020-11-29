import Button from "app/users/components/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

type GeneralProps = {
  toNext: any
  onEdit: any
  meeting: any
}

const General = (props: GeneralProps) => {
  const textChanged = (e: any) => {
    console.log(e)
    props.onEdit(e.currentTarget.name, e.currentTarget.value)
  }

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
          <div className="col-start-2 col-span-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={props.meeting.name}
                  onChange={textChanged}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-start-1 col-span-4">
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                  Invite Link
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={props.meeting.link}
                  onChange={textChanged}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-start-1 col-span-8">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    onChange={textChanged}
                    value={props.meeting.description}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Meeting description..."
                  ></textarea>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description of what the Meeting is about or a agenda (Markdown support would
                  be awesome)
                </p>
              </div>
            </div>
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

export default General
