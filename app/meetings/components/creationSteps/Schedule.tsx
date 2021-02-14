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
  const [scheduleId, setScheduleId] = useState<number>()
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
        <Form.Group controlId="timezone">
          <Form.Label>Timezone</Form.Label>
          <Form.Control
            as="select"
            name="timezone"
            value={timezone}
            onChange={(evt) => setTimezone(+evt.target.value)}
          >
            <option value="-12">(GMT-12:00) International Date Line West</option>
            <option value="-11">(GMT-11:00) Midway Island, Samoa</option>
            <option value="-10">(GMT-10:00) Hawaii</option>
            <option value="-9">(GMT-09:00) Alaska</option>
            <option value="-8">(GMT-08:00) Pacific Time (US & Canada)</option>
            <option value="-8">(GMT-08:00) Tijuana, Baja California</option>
            <option value="-7">(GMT-07:00) Arizona</option>
            <option value="-7">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
            <option value="-7">(GMT-07:00) Mountain Time (US & Canada)</option>
            <option value="-6">(GMT-06:00) Central America</option>
            <option value="-6">(GMT-06:00) Central Time (US & Canada)</option>
            <option value="-6">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
            <option value="-6">(GMT-06:00) Saskatchewan</option>
            <option value="-5">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
            <option value="-5">(GMT-05:00) Eastern Time (US & Canada)</option>
            <option value="-5">(GMT-05:00) Indiana (East)</option>
            <option value="-4">(GMT-04:00) Atlantic Time (Canada)</option>
            <option value="-4">(GMT-04:00) Caracas, La Paz</option>
            <option value="-4">(GMT-04:00) Manaus</option>
            <option value="-4">(GMT-04:00) Santiago</option>
            <option value="-3.5">(GMT-03:30) Newfoundland</option>
            <option value="-3">(GMT-03:00) Brasilia</option>
            <option value="-3">(GMT-03:00) Buenos Aires, Georgetown</option>
            <option value="-3">(GMT-03:00) Greenland</option>
            <option value="-3">(GMT-03:00) Montevideo</option>
            <option value="-2">(GMT-02:00) Mid-Atlantic</option>
            <option value="-1">(GMT-01:00) Cape Verde Is.</option>
            <option value="-1">(GMT-01:00) Azores</option>
            <option value="0">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
            <option value="0">
              (GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London
            </option>
            <option value="1">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
            <option value="1">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
            <option value="1">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
            <option value="1">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
            <option value="1">(GMT+01:00) West Central Africa</option>
            <option value="2">(GMT+02:00) Amman</option>
            <option value="2">(GMT+02:00) Athens, Bucharest, Istanbul</option>
            <option value="2">(GMT+02:00) Beirut</option>
            <option value="2">(GMT+02:00) Cairo</option>
            <option value="2">(GMT+02:00) Harare, Pretoria</option>
            <option value="2">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
            <option value="2">(GMT+02:00) Jerusalem</option>
            <option value="2">(GMT+02:00) Minsk</option>
            <option value="2">(GMT+02:00) Windhoek</option>
            <option value="3">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
            <option value="3">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
            <option value="3">(GMT+03:00) Nairobi</option>
            <option value="3">(GMT+03:00) Tbilisi</option>
            <option value="3.5">(GMT+03:30) Tehran</option>
            <option value="4">(GMT+04:00) Abu Dhabi, Muscat</option>
            <option value="4">(GMT+04:00) Baku</option>
            <option value="4">(GMT+04:00) Yerevan</option>
            <option value="4.5">(GMT+04:30) Kabul</option>
            <option value="5">(GMT+05:00) Yekaterinburg</option>
            <option value="5">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
            <option value="5.5">(GMT+05:30) Sri Jayawardenapura</option>
            <option value="5.5">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
            <option value="5.75">(GMT+05:45) Kathmandu</option>
            <option value="6">(GMT+06:00) Almaty, Novosibirsk</option>
            <option value="6">(GMT+06:00) Astana, Dhaka</option>
            <option value="6.5">(GMT+06:30) Yangon (Rangoon)</option>
            <option value="7">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
            <option value="7">(GMT+07:00) Krasnoyarsk</option>
            <option value="8">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
            <option value="8">(GMT+08:00) Kuala Lumpur, Singapore</option>
            <option value="8">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
            <option value="8">(GMT+08:00) Perth</option>
            <option value="8">(GMT+08:00) Taipei</option>
            <option value="9">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
            <option value="9">(GMT+09:00) Seoul</option>
            <option value="9">(GMT+09:00) Yakutsk</option>
            <option value="9.5">(GMT+09:30) Adelaide</option>
            <option value="9.5">(GMT+09:30) Darwin</option>
            <option value="10">(GMT+10:00) Brisbane</option>
            <option value="10">(GMT+10:00) Canberra, Melbourne, Sydney</option>
            <option value="10">(GMT+10:00) Hobart</option>
            <option value="10">(GMT+10:00) Guam, Port Moresby</option>
            <option value="10">(GMT+10:00) Vladivostok</option>
            <option value="11">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
            <option value="12">(GMT+12:00) Auckland, Wellington</option>
            <option value="12">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
            <option value="13">(GMT+13:00) Nuku'alofa</option>
          </Form.Control>
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
          {props.schedulePresets.length === 0 ? (
            <p>You dont have any Schedule presets, please add a Schedule first: </p>
          ) : (
            <Form.Control
              as="select"
              onChange={(e) => setScheduleId(Number(e.currentTarget.value))}
            >
              <option>Select a Schedule</option>
              {props.schedulePresets.map((schedule: Schedule) => {
                return <option value={schedule.id}>{schedule.name}</option>
              })}
            </Form.Control>
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
