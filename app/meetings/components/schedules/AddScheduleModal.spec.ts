import { isBefore, isScheduleWellFormed, parseTime } from "./AddScheduleModal"

test(parseTime.name, () => {
  expect(parseTime("09:10")).toEqual([9, 10])
  expect(parseTime("11:09")).toEqual([11, 9])
  expect(parseTime("24:09")).toEqual(null)
})

test(isBefore.name, () => {
  expect(isBefore("09:10", "20:20")).toEqual(true)
  expect(isBefore("09:10", "20:10")).toEqual(true)
  expect(isBefore("09:10", "09:10")).toEqual(false)
  expect(isBefore("10:20", "09:10")).toEqual(false)
})

test(isScheduleWellFormed.name, () => {
  expect(
    isScheduleWellFormed({
      monday: { start: "09:10", end: "20:10" },
      tuesday: { start: "09:10", end: "20:10" },
      wednesday: { start: "09:10", end: "20:10" },
      thursday: { start: "09:10", end: "20:10" },
      friday: { start: "09:10", end: "20:10" },
      saturday: { start: "09:10", end: "20:10" },
      sunday: { start: "09:10", end: "20:10" },
    })
  ).toBe(true)

  expect(
    isScheduleWellFormed({
      monday: { start: "09:10", end: "20:10" },
      tuesday: { start: "09:10", end: "20:10" },
      wednesday: { start: "09:10", end: "20:10" },
      thursday: { start: "09:10", end: "20:10" },
      friday: { start: "09:10", end: "20:10" },
      saturday: { start: "09:10", end: "20:10" },
      sunday: { start: "20:20", end: "20:10" }, // 👈
    })
  ).toBe(false)
})
