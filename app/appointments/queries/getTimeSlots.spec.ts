import getTimeSlots from "./getTimeSlots"

beforeEach(() => {
  //create user
  //create calender
  //create meeting
})

describe("getTimeSlots", () => {
  describe("when given invalid slug", () => {
    it("return null", async () => {
      const r = await getTimeSlots({ meetingSlug: "is invalid", calendarOwner: "1" })
      expect(r).toEqual(null)
    })
  })
  describe("when given invalid uid", () => {
    it("return null", async () => {
      const r = await getTimeSlots({ meetingSlug: "test", calendarOwner: "isNaN" })
      expect(r).toEqual(null)
    })
  })
  describe("when given nonexistant uid", () => {
    it("return null", async () => {
      const r = await getTimeSlots({ meetingSlug: "test", calendarOwner: "99" })
      expect(r).toEqual(null)
    })
  })
  describe("when given nonexistant slug", () => {
    it("return null", async () => {
      const r = await getTimeSlots({
        meetingSlug: "doesNotExistButIsValidInput",
        calendarOwner: "1",
      })
      expect(r).toEqual(null)
    })
  })
})
