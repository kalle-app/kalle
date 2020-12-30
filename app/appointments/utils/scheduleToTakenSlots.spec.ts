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
      scheduleToTakenSlots(nineToFiveSchedule, {
        start: new Date("2020-12-28T08:00:00.000Z"),
        end: new Date("2021-01-04T10:00:00.000Z"),
      })
    ).toEqual([
      {
        start: new Date("2020-12-25T17:00:00.000Z"),
        end: new Date("2020-12-28T09:00:00.000Z"),
      },
      {
        start: new Date("2020-12-28T17:00:00.000Z"),
        end: new Date("2020-12-29T09:00:00.000Z"),
      },
      {
        start: new Date("2020-12-29T17:00:00.000Z"),
        end: new Date("2020-12-30T09:00:00.000Z"),
      },
      {
        start: new Date("2020-12-30T17:00:00.000Z"),
        end: new Date("2020-12-31T09:00:00.000Z"),
      },
      {
        start: new Date("2020-12-31T17:00:00.000Z"),
        end: new Date("2021-01-01T09:00:00.000Z"),
      },
      {
        start: new Date("2021-01-01T17:00:00.000Z"),
        end: new Date("2021-01-04T09:00:00.000Z"),
      },
    ])
  })
})
