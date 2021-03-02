import { boilDownIntervals } from "./boildown-intervals"

describe("googlecalendar", () => {
  it("testMergeArray", () => {
    expect(
      boilDownIntervals(
        [
          { start: 123, end: 456 },
          { start: 500, end: 550 },
          { start: 400, end: 490 },
          { start: 600, end: 650 },
        ],
        { start: 0, end: 1000 }
      )
    ).toEqual([
      { start: 123, end: 490 },
      { start: 500, end: 550 },
      { start: 600, end: 650 },
    ])
  })
  it("some other data", () => {
    expect(
      boilDownIntervals(
        [
          { start: 123, end: 456 },
          { start: 124, end: 550 },
          { start: 549, end: 600 },
          { start: 600, end: 650 },
        ],
        { start: 0, end: 1000 }
      )
    ).toEqual([{ start: 123, end: 650 }])
  })
})
