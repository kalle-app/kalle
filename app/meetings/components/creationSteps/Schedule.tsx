import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Form, ButtonGroup, Button, ToggleButton } from "react-bootstrap"
import { useState } from "react"
import type { Schedule } from "db"
import AddSchedule from "../schedules/AddScheduleModal"

interface ScheduleFormResult {
  timezone: number
  startDate: Date
  endDate: Date
  scheduleId: number
  duration: number
}

type ScheduleProps = {
  stepBack: () => void
  toNext: (result: ScheduleFormResult) => void
  schedulePresets: Schedule[]
}

const ScheduleStep = (props: ScheduleProps) => {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [timezone, setTimezone] = useState<number>(0)
  const [duration, setDuration] = useState(30)
  const [scheduleId, setScheduleId] = useState<number | undefined>(props.schedulePresets[0]?.id)
  const [modalVisible, setModalVisibility] = useState(false)

  return (
    <div className="p-3">
      <h4>Schedule</h4>
      <p className="pb-3">Adjust the schedule for your meeting</p>
      <Form
        className="m-3"
        onSubmit={(evt) => {
          evt.preventDefault()

          if (!endDate || !startDate) {
            return
          }

          if (!scheduleId) {
            return
          }

          props.toNext({
            endDate,
            startDate,
            scheduleId,
            timezone,
            duration,
          })
        }}
      >
        <Form.Group controlId="duration">
          <Form.Label>Duration</Form.Label>
          <ButtonGroup toggle>
            {[15, 30, 60].map((d) => (
              <ToggleButton
                key={d}
                type="radio"
                name="radio"
                id={"duration-" + d}
                onClick={() => setDuration(d)}
                value={d}
                checked={duration === d}
              >
                {d} min
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>
        <Form.Group controlId="formRange">
          <Form.Label>Range</Form.Label>
          <Form.Row>
            <DatePicker
              dateFormat="dd.MM.yyyy"
              onChange={setStartDate}
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="m-1"
              id="range-start"
            />
            <DatePicker
              dateFormat="dd.MM.yyyy"
              onChange={setEndDate}
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="m-1"
              id="range-end"
            />
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="select-schedule">
          <Form.Label>Select Schedule</Form.Label>
          {props.schedulePresets.length == 0 ? (
            <p>Please add a Schedule to continue with the creation of a meeting. A schedule sets your general availability.</p>
          ) : (<>
            <Form.Control
              as="select"
              onChange={(e) => setScheduleId(Number(e.currentTarget.value))}
              value={scheduleId}
            >
              <option>Select a Schedule</option>
              {props.schedulePresets.map((schedule: Schedule) => {
                return <option value={schedule.id}>{schedule.name}</option>
              })}
            </Form.Control>
            <p>
              The time zone is {props.schedulePresets.find(s => s.id === scheduleId)?.timezone}.
            </p></>
          )}
        </Form.Group>
        <Button id="add-schedule" onClick={() => setModalVisibility(true)}>
          Add Schedule
        </Button>
        <div className="p-3 d-flex justify-content-end">
          <Button onClick={props.stepBack} className="mx-1">
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </Button>
          <Button
            type="submit"
            id="submit"
            className="mx-1"
            disabled={!startDate || !endDate || !scheduleId}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </Button>
        </div>
        <AddSchedule show={modalVisible} setVisibility={setModalVisibility} />
      </Form>
    </div>
  )
}

export default ScheduleStep
