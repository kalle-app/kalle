import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"
import "react-datepicker/dist/react-datepicker.css"

type AvailabilityProps = {
  stepBack: () => void
  toNext: () => void
}

const AvailabilityStep = (props: AvailabilityProps) => {
  return (
    <div className="p-3">
      <h4>Availability</h4>
      <p className="pb-3">Specify your available timeslots</p>
      <div className="p-3 d-flex justify-content-end">
        <Button onClick={props.stepBack} type="submit" className="mx-1">
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
        <Button onClick={props.toNext} type="submit" id="submit" className="mx-1">
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
      </div>
    </div>
  )
}

export default AvailabilityStep
