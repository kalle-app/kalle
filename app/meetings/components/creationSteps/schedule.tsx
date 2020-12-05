import React from "react"
import Button from "app/users/components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight, faAngleDoubleLeft, faPlus } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Meeting } from "app/meetings/types"

type ScheduleProps = {
  stepBack: () => void
  toNext: () => void
  onEdit: (key: string, value: any) => void
  meeting: Meeting
}

const Schedule = (props: ScheduleProps) => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const handleChange = (e: any) => {
    props.onEdit(e.currentTarget.name, e.currentTarget.value)
  }

  const handleDurationChange = (e: any) => {
    props.onEdit(e.currentTarget.name, parseInt(e.currentTarget.value))
  }

  const handleTimezoneChange = (e: any) => {
    props.onEdit(e.currentTarget.name, parseInt(e.currentTarget.value))
  }

  const handleSelection = (e: any) => {
    props.onEdit(e.target.name, parseInt(e.target.value))
  }

  const addSchedule = (e: any, day: string, type: string) => {
    props.onEdit("schedule", { day: day, value: e.currentTarget.value, type: type })
  }

  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Schedule</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Specify Schedule and Duration of the Meeting
        </p>
      </div>

      <div className="border-t border-gray-200">
        <div className="grid grid-cols-8 gap-6 bg-white px-4 py-5 sm:px-6">
          <div className="col-span-1">
            <Button action={() => props.stepBack()}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </Button>
          </div>

          <div className="col-start-2 col-span-6">
            <fieldset>
              <div className="col-span-2">
                <legend className="text-base font-medium text-gray-900">Duration</legend>
                <p className="text-sm text-gray-500">
                  Select the Duration that you want your meeting to be
                </p>
              </div>
              <div className="grid grid-cols-12 gap-6 mt-2">
                <div className="col-span-2 flex items-center">
                  <input
                    id="duration_quarter"
                    name="duration"
                    type="radio"
                    value={15}
                    checked={props.meeting.duration === 15}
                    onChange={handleSelection}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="duration_quarter"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    15 min
                  </label>
                </div>
                <div className="col-span-2 flex items-center">
                  <input
                    id="duration_half"
                    name="duration"
                    type="radio"
                    value={30}
                    checked={props.meeting.duration === 30}
                    onChange={handleSelection}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="duration_half"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    30 min
                  </label>
                </div>
                <div className="col-span-2 flex items-center">
                  <input
                    id="duration_hour"
                    name="duration"
                    type="radio"
                    value={60}
                    checked={props.meeting.duration === 60}
                    onChange={handleSelection}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="duration_hour"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    1 hour
                  </label>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="duration_custom"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Custom Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration_custom"
                    name="duration"
                    value={
                      [15, 30, 60].includes(props.meeting.duration) ? NaN : props.meeting.duration
                    }
                    onChange={handleDurationChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </fieldset>

            <div className="col-span-2 mt-5">
              <legend className="text-base font-medium text-gray-900">Timezone</legend>
              <div className="grid grid-cols-8">
                <select
                  id="timezone"
                  name="timezone"
                  value={props.meeting.timezone}
                  onChange={handleTimezoneChange}
                  className="mt-1 block col-span-4 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  <option value="1">
                    (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
                  </option>
                  <option value="1">
                    (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
                  </option>
                  <option value="1">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                  <option value="1">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                  <option value="1">(GMT+01:00) West Central Africa</option>
                  <option value="2">(GMT+02:00) Amman</option>
                  <option value="2">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                  <option value="2">(GMT+02:00) Beirut</option>
                  <option value="2">(GMT+02:00) Cairo</option>
                  <option value="2">(GMT+02:00) Harare, Pretoria</option>
                  <option value="2">
                    (GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius
                  </option>
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
                </select>
              </div>
            </div>

            <div className="col-span-2 mt-5">
              <legend className="text-base font-medium text-gray-900">
                Select the Dates between which the Meeting could take place
              </legend>
              <div className="grid grid-cols-8 gap-6 bg">
                <div className="col-span-2">
                  <DatePicker
                    dateFormat="dd.MM.yyyy"
                    selected={props.meeting.startDate}
                    onChange={(date) => props.onEdit("startDate", date)}
                    selectsStart
                    startDate={props.meeting.startDate}
                    endDate={props.meeting.endDate}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <DatePicker
                    dateFormat="dd.MM.yyyy"
                    selected={props.meeting.endDate}
                    onChange={(date) => props.onEdit("endDate", date)}
                    selectsEnd
                    startDate={props.meeting.startDate}
                    endDate={props.meeting.endDate}
                    minDate={props.meeting.startDate}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2 mt-5">
              <legend className="text-base font-medium text-gray-900">Set schedule</legend>
              <p className="text-sm text-gray-500">
                Select when you are usually available. We will shortly add selection of presets here
              </p>
              <div className="grid grid-cols-12 mt-3">
                {days.map((day) => {
                  return (
                    <div key={day} className="col-span-12 grid grid-cols-12">
                      <div className="col-span-2">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                      <div className="col-span-8 grid grid-cols-4">
                        <input
                          type="text"
                          value={props.meeting.schedule[day][0]}
                          onChange={(e) => {
                            addSchedule(e, day, "start")
                          }}
                          className="mt-1 mr-3 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                        />
                        <p className="text-center">-</p>
                        <input
                          type="text"
                          onChange={(e) => {
                            addSchedule(e, day, "end")
                          }}
                          value={props.meeting.schedule[day][1]}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <Button action={() => {}}>
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </div>
                    </div>
                  )
                })}
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

export default Schedule
