import React from "react"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"

type AdvancedProps = {
  stepBack: () => void
  onEdit: (key: string, value: any) => void
  onSubmit: () => void
}

const AdvancedStep = (props: AdvancedProps) => {
  return (
    <div className="p-3">
      <h4>Advanced Options</h4>
      <p className="pb-3">Specify advanced options for you meeting</p>
      <div className="p-3 d-flex justify-content-end">
        <Button onClick={props.stepBack} type="submit" className="mx-1">
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
        <Button onClick={props.onSubmit} className="mx-1">
          Submit
        </Button>
      </div>
    </div>
  )
}

export default AdvancedStep
