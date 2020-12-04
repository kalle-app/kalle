import getSlotsAtSpecificDate from "./getSlotsAtSpecificDate"

const dailySchedule = [
  { day: "monday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "tuesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "wednesday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "thursday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
  { day: "friday", startTime: "9:00", endTime: "17:00", meetingId: 2 },
]

const start = new Date("2050-01-25T11:00:00.000Z")
const end = new Date("2050-01-25T13:00:00.000Z")
const start1 = new Date("2050-01-25T14:00:00.000Z")
const end1 = new Date("2050-01-25T15:00:00.000Z")
const start2 = new Date("2050-01-25T18:00:00.000Z")
const end2 = new Date("2050-01-25T20:00:00.000Z")

const startn = new Date("2020-11-26T11:00:00.000Z")
const endn = new Date("2020-11-26T13:00:00.000Z")
const start1n = new Date("2020-11-26T13:00:00.000Z")
const end1n = new Date("2020-11-26T15:00:00.000Z")
const start2n = new Date("2020-11-26T15:00:00.000Z")
const end2n = new Date("2020-11-26T17:00:00.000Z")
const slotsMock = [
  { start: start, end: end },
  { start: start1, end: end1 },
  { start: start2, end: end2 },
  { start: startn, end: endn },
  { start: start1n, end: end1n },
  { start: start2n, end: end2n },
]

describe("getSlotsAtSpecificDate", () => {
  describe("when given invalid input", () => {
    it("return null", () => {
      typeof getSlotsAtSpecificDate([{ test: "test" }], [{ test: "test" }]) === null
    })
    it("return null", () => {
      typeof getSlotsAtSpecificDate(
        60,
        [{ test: slotsMock }],
        [{ day: "tuesday", startTime: "9:00", endTime: "8:00", meetingId: 2 }]
      ) === null
    })
  })
  describe("when no time slot available", () => {
    it("return null", () => {
      expect(
        getSlotsAtSpecificDate(
          60,
          [{ start: new Date("2050-01-25T00:00:00.000Z"), end: "2050-01-25T22:00:00.000Z" }],
          dailySchedule
        )?.length
      ).toEqual(0)
    })
  })
  describe("one single slot is available", () => {
    it("single slot", () => {
      expect(
        getSlotsAtSpecificDate(
          60,
          [{ start: new Date("2050-01-25T01:00:00.000Z"), end: "2050-01-25T16:00:00.000Z" }],
          dailySchedule
        )?.length
      ).toEqual(1)
    })
  })
})
