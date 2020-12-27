import { computeAvailableSlots } from "./computeAvailableSlots"

describe("computeAvailableSlots", () => {
  test("common case", () => {
    expect(
      computeAvailableSlots({
        between: {
          start: new Date("2020-12-28T10:00:00.000Z"),
          end: new Date("2020-12-28T12:00:00.000Z"),
        },
        durationInMilliseconds: 30 * 60 * 1000,
        takenSlots: [
          {
            start: new Date("2020-12-28T10:20:00.000Z"),
            end: new Date("2020-12-28T11:10:00.000Z"),
          },
        ],
      })
    ).toEqual([
      {
        start: new Date("2020-12-28T11:10:00.000Z"),
        end: new Date("2020-12-28T11:40:00.000Z"),
      },
    ])
  })
})
