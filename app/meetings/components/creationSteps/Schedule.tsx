import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Form, ButtonGroup, Button, ToggleButton, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import type { Schedule } from "db"
import AddSchedule from "../schedules/AddScheduleModal"
import { Meeting } from "app/meetings/types"

interface ScheduleFormResult {
  startDate: Date
  endDate: Date
  scheduleId: number
  duration: number
}

type ScheduleProps = {
  initialMeeting: Meeting
  stepBack: () => void
  onSubmit: (result: ScheduleFormResult) => void
  schedulePresets: Pick<Schedule, "id" | "timezone" | "name">[]
}

const ScheduleStep = (props: ScheduleProps) => {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [duration, setDuration] = useState(30)
  const [scheduleId, setScheduleId] = useState<number | undefined>(props.schedulePresets[0]?.id)
  const [modalVisible, setModalVisibility] = useState(false)

  useEffect(() => {
    setStartDate(props.initialMeeting.startDate)
    setEndDate(props.initialMeeting.endDate)
    setDuration(props.initialMeeting.duration)
    setScheduleId(props.initialMeeting.scheduleId)
  }, [])

  const updateDuration = (input: number) => {
    if (input === 0) {
      setDuration(30)
      return
    }
    setDuration(input)
  }

  return (
    <div className="p-3">
      <Form
        autoComplete="off"
        className="m-3"
        onSubmit={(evt) => {
          evt.preventDefault()

          if (!endDate || !startDate) {
            return
          }

          if (!scheduleId) {
            return
          }

          props.onSubmit({
            endDate,
            startDate,
            scheduleId,
            duration,
          })
        }}
      >
        <h4>Schedule</h4>
        <p className="pb-3">Adjust the schedule for your meeting</p>
        <Form.Row>
          <Form.Group as={Col} md="6" lg="5" xl="4" controlId="duration">
            <Form.Label className="mr-3">Duration</Form.Label>
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
          <Form.Group as={Col} xs="8" md="6" lg="4" xxl="3" controlId="customDuration">
            <Form.Control
              type="number"
              onChange={(event) => {
                updateDuration(Number(event.currentTarget.value))
              }}
              defaultValue={[15, 30, 60].some((time) => time == duration) ? "" : duration}
              placeholder="Custom Duration (minutes)"
              name="customDuration"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formRange">
          <Form.Label>Range</Form.Label>
          <Form.Row>
            <DatePicker
              dateFormat="dd.MM.yyyy"
              minDate={new Date()}
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
              minDate={startDate}
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              className="m-1"
              id="range-end"
            />
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="select-schedule">
          <Form.Label>Select Schedule</Form.Label>
          {props.schedulePresets.length === 0 ? (
            <p>
              Please add a Schedule to continue with the creation of a meeting. A schedule sets your
              general availability.
            </p>
          ) : (
            <>
              <Form.Control
                as="select"
                onChange={(e) => setScheduleId(Number(e.currentTarget.value))}
                value={scheduleId}
              >
                <option>Select a Schedule</option>
                {props.schedulePresets.map((schedule) => {
                  return (
                    <option key={"schedule" + schedule.id} value={schedule.id}>
                      {schedule.name}
                    </option>
                  )
                })}
              </Form.Control>
              <p>
                The time zone is {props.schedulePresets.find((s) => s.id === scheduleId)?.timezone}.
              </p>
            </>
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
