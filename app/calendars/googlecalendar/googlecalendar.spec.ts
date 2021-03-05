import { mergeArr } from "../utils"

describe("googlecalendar", () => {
  it("testMergeArray", () => {
    const calendarOne = [
      { start: 123, end: 456 },
      { start: 500, end: 550 },
      { start: 400, end: 490 },
      { start: 600, end: 650 },
    ]
    expect(mergeArr(calendarOne)).toEqual([
      { start: 123, end: 490 },
      { start: 500, end: 550 },
      { start: 600, end: 650 },
    ])
  })
  it("some other data", () => {
    const calendarOne = [
      { start: 123, end: 456 },
      { start: 124, end: 550 },
      { start: 549, end: 600 },
      { start: 600, end: 650 },
    ]
    expect(mergeArr(calendarOne)).toEqual([{ start: 123, end: 650 }])
  })
})
