import { formatAs24HourClockString } from "./format"

test("formatAs24HourClockString", () => {
  const offsetInHours = new Date().getTimezoneOffset() / 60
  expect(formatAs24HourClockString(new Date("2020-12-27T08:40:23.286Z"))).toEqual(
    `0${8 - offsetInHours}:40`
  )
  expect(formatAs24HourClockString(new Date("2020-12-27T12:40:23.286Z"))).toEqual(
    `${12 - offsetInHours}:40`
  )
})
