import React from "react"
import { Button, Modal } from "react-bootstrap"

interface AddScheduleProps {
  show: boolean
  setVisibility: (value: boolean) => void
}

const AddSchedule = (props: AddScheduleProps) => {
  return (
    <Modal show={props.show} onHide={() => props.setVisibility(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setVisibility(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => props.setVisibility(false)}>
          Save Schedule
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddSchedule
