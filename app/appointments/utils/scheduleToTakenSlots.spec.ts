import { Days, partialTime, Schedule, scheduleToTakenSlots } from "./scheduleToTakenSlots"

const nineToFive = { start: partialTime(9, 0), end: partialTime(17, 0) }

const nineToFiveSchedule: Schedule = {
  [Days.monday]: nineToFive,
  [Days.tuesday]: nineToFive,
  [Days.wednesday]: nineToFive,
  [Days.thursday]: nineToFive,
  [Days.friday]: nineToFive,
}

describe("scheduleToTakenSlots", () => {
  test("nine to five", () => {
    expect(
      scheduleToTakenSlots(
        nineToFiveSchedule,
        {
          start: new Date("2020-12-28T08:00:00.000Z"),
          end: new Date("2021-01-04T10:00:00.000Z"),
        },
        "Europe/Berlin"
      )
    ).toEqual([
      {
        start: new Date("2020-12-25T17:00:00.000+01:00"),
        end: new Date("2020-12-28T09:00:00.000+01:00"),
      },
      {
        start: new Date("2020-12-28T17:00:00.000+01:00"),
        end: new Date("2020-12-29T09:00:00.000+01:00"),
      },
      {
        start: new Date("2020-12-29T17:00:00.000+01:00"),
        end: new Date("2020-12-30T09:00:00.000+01:00"),
      },
      {
        start: new Date("2020-12-30T17:00:00.000+01:00"),
        end: new Date("2020-12-31T09:00:00.000+01:00"),
      },
      {
        start: new Date("2020-12-31T17:00:00.000+01:00"),
        end: new Date("2021-01-01T09:00:00.000+01:00"),
      },
      {
        start: new Date("2021-01-01T17:00:00.000+01:00"),
        end: new Date("2021-01-04T09:00:00.000+01:00"),
      },
      {
        start: new Date("2021-01-04T17:00:00.000+01:00"),
        end: new Date("2021-01-05T09:00:00.000+01:00"),
      },
    ])
  })

  test("daylight savings time", () => {
    expect(
      scheduleToTakenSlots(
        {
          ...nineToFiveSchedule,
          [Days.saturday]: nineToFive,
          [Days.sunday]: nineToFive,
        },
        {
          start: new Date("2019-10-26T08:00:00.000Z"),
          end: new Date("2019-10-28T10:00:00.000Z"),
        },
        "Europe/Berlin"
      )
    ).toEqual([
      {
        start: new Date("2019-10-25T17:00:00.000+02:00"),
        end: new Date("2019-10-26T09:00:00.000+02:00"),
      },
      {
        start: new Date("2019-10-26T17:00:00.000+02:00"),
        end: new Date("2019-10-27T09:00:00.000+01:00"),
      },
      {
        start: new Date("2019-10-27T17:00:00.000+01:00"),
        end: new Date("2019-10-28T09:00:00.000+01:00"),
      },
      {
        start: new Date("2019-10-28T17:00:00.000+01:00"),
        end: new Date("2019-10-29T09:00:00.000+01:00"),
      },
    ])
  })
})
