import { endOfLastWorkDayBefore, startOfFirstWorkDayOnOrAfter } from "./scheduleHelpers"
import { Days, timeStringToPartialTime } from "app/appointments/utils/scheduleToTakenSlots"

test(endOfLastWorkDayBefore.name, () => {
  const nineToFive = {
    start: timeStringToPartialTime("09:00"),
    end: timeStringToPartialTime("17:00"),
  }
  expect(
    endOfLastWorkDayBefore(
      new Date("2021-03-12T12:46:49.000Z"),
      {
        [Days.monday]: nineToFive,
        [Days.tuesday]: nineToFive,
        [Days.wednesday]: nineToFive,
        [Days.thursday]: nineToFive,
        [Days.friday]: nineToFive,
        [Days.saturday]: undefined,
        [Days.sunday]: undefined,
      },
      "Europe/Berlin"
    )
  ).toEqual(new Date("2021-03-11T17:00:00.000+01:00"))
})

test(startOfFirstWorkDayOnOrAfter.name, () => {
  const nineToFive = {
    start: timeStringToPartialTime("09:00"),
    end: timeStringToPartialTime("17:00"),
  }
  expect(
    startOfFirstWorkDayOnOrAfter(
      new Date("2021-03-08T12:46:49.000Z"),
      {
        [Days.monday]: nineToFive,
        [Days.tuesday]: nineToFive,
        [Days.wednesday]: nineToFive,
        [Days.thursday]: nineToFive,
        [Days.friday]: nineToFive,
        [Days.saturday]: undefined,
        [Days.sunday]: undefined,
      },
      "Europe/Berlin"
    )
  ).toEqual(new Date("2021-03-08T09:00:00.000+01:00"))
})
