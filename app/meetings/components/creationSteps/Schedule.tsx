import React from "react"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight, faAngleDoubleLeft, faPlus } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Meeting } from "app/meetings/types"
import Form from "react-bootstrap/Form"
import { Schedule } from "@prisma/client"
import { FormControl } from "react-bootstrap"

type ScheduleProps = {
  stepBack: () => void
  toNext: () => void
  onEdit: (key: string, value: any) => void
  meeting: Meeting
  schedulePresets: Schedule[]
}

const ScheduleStep = (props: ScheduleProps) => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const handleTimezoneChange = (e: any) => {
    props.onEdit(e.currentTarget.name, parseInt(e.currentTarget.value))
  }

  const handleSelection = (e: any) => {
    props.onEdit(e.target.name, parseInt(e.target.value))
  }

  const setSchedule = (e: any) => {
    console.log(e)
    props.onEdit("scheduleId", parseInt(e.currentTarget.value))
  }

  return (
    <div className="p-3">
      <h4>Schedule</h4>
      <p className="pb-3">Adjust the schedule for your meeting</p>
      <Form className="m-3">
        <Form.Group controlId="formDuration">
          <Form.Label>Duration</Form.Label>
          <Form.Row>
            <Form.Check
              name="duration"
              label="15 min"
              type="radio"
              value={15}
              checked={props.meeting.duration === 15}
              onChange={handleSelection}
              className="mx-1"
            />
            <Form.Check
              name="duration"
              label="30 min"
              type="radio"
              value={30}
              checked={props.meeting.duration === 30}
              onChange={handleSelection}
              className="mx-1"
            />
            <Form.Check
              name="duration"
              label="60 min"
              type="radio"
              value={60}
              checked={props.meeting.duration === 60}
              onChange={handleSelection}
              className="mx-1"
            />
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="formTimezone">
          <Form.Label>Timezone</Form.Label>
          <Form.Control
            as="select"
            name="timezone"
            value={props.meeting.timezone}
            onChange={handleTimezoneChange}
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
              selected={props.meeting.startDate}
              onChange={(date) => props.onEdit("startDate", date)}
              selectsStart
              startDate={props.meeting.startDate}
              endDate={props.meeting.endDate}
              className="m-1"
            />
            <DatePicker
              dateFormat="dd.MM.yyyy"
              selected={props.meeting.endDate}
              onChange={(date) => props.onEdit("endDate", date)}
              selectsEnd
              startDate={props.meeting.startDate}
              endDate={props.meeting.endDate}
              minDate={props.meeting.startDate}
              className="m-1"
            />
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="select-schedule">
          <Form.Label>Select Schedule</Form.Label>
          <Form.Control as="select" onChange={setSchedule}>
            <option>Select a Schedule</option>
            {props.schedulePresets.map((schedule: Schedule) => {
              return <option value={schedule.id}>{schedule.name}</option>
            })}
          </Form.Control>
        </Form.Group>
      </Form>
      <div className="p-3 d-flex justify-content-end">
        <Button onClick={props.stepBack} type="submit" className="mx-1">
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
        <Button onClick={props.toNext} type="submit" className="mx-1">
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
      </div>
    </div>
  )
}

export default ScheduleStep
