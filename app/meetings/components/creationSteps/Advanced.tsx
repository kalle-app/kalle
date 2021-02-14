import { Button } from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"
import {
  DefaultCalendarSelector,
  SelectorType,
} from "../../../users/components/DefaultCalendarSelector/DefaultCalendarSelector"
import getDefaultCalendarByUser from "../../../users/queries/getDefaultCalendarByUser"
import { useQuery } from "blitz"
type AdvancedProps = {
  stepBack: () => void
  onSubmit: (defaultCalendarId: number) => void
}
const AdvancedStep = (props: AdvancedProps) => {
  let [getDefaultCalendar] = useQuery(getDefaultCalendarByUser, null)
  if (!getDefaultCalendar) throw new Error("No Default Calendar")
  let defaultCalendarId: number = getDefaultCalendar //= getDefaultCalendar!!;
  return (
    <div className="p-3">
      <h4>Advanced Options</h4>
      <p className="pb-3">Specify advanced options for you meeting</p>
      <DefaultCalendarSelector
        type={SelectorType.meetingBased}
        onChange={(selectedDefaultCalendarId) => {
          console.log(selectedDefaultCalendarId)
          defaultCalendarId = selectedDefaultCalendarId
          console.log(defaultCalendarId)
          //TODO: BELOW HANDLE WHEN MEETINGID IS -1
        }}
      />
      <div className="p-3 d-flex justify-content-end">
        <Button onClick={props.stepBack} type="submit" className="mx-1">
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
        <Button
          onClick={() => {
            console.log("CREATE")

            console.log(defaultCalendarId)
            props.onSubmit(defaultCalendarId)
          }}
          id="submit"
          className="mx-1"
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default AdvancedStep
