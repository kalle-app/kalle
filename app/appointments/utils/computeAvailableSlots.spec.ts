import { computeAvailableSlots } from "./computeAvailableSlots"

describe("computeAvailableSlots", () => {
  test("common case", () => {
    expect(
      computeAvailableSlots(
        {
          start: new Date("2020-12-28T10:00:00.000Z"),
          end: new Date("2020-12-28T12:00:00.000Z"),
        },
        30,
        [
          {
            start: new Date("2020-12-28T10:20:00.000Z"),
            end: new Date("2020-12-28T11:10:00.000Z"),
          },
        ]
      )
    ).toEqual([
      {
        start: new Date("2020-12-28T11:10:00.000Z"),
        end: new Date("2020-12-28T11:40:00.000Z"),
      },
    ])
  })
})
