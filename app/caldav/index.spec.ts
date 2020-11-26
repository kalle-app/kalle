import { freeBusy } from "./"
import fetch from "node-fetch"

const baikalJohnDoe = {
  url: "http://localhost:5232/dav.php/calendars/john.doe/test",
  auth: {
    username: "john.doe",
    password: "root",
    digest: true,
  },
}

describe("baikal test instance", () => {
  it("is available", async () => {
    try {
      const response = await fetch("http://localhost:5232")
      expect(response.status).toEqual(200)
    } catch (error) {
      throw new Error(
        "Baikal not available. Run `npm run test:baikal:start` to start the container."
      )
    }
  })
})

describe("freeBusy", () => {
  it("returns a freeBusy schedule", async () => {
    const result = await freeBusy(baikalJohnDoe)
    const expected = [{"end": new Date(2020, 10, 25, 14, 0, 0, 0), "start": new Date(2020, 10, 25, 12, 0, 0, 0), "type": "BUSY"}, 
                      {"end": new Date(2020, 10, 25, 23, 0, 0, 0), "start": new Date(2020, 10, 25, 20, 0, 0, 0), "type": "BUSY"}, 
                      {"end": new Date(2020, 10, 26, 12, 0, 0, 0), "start": new Date(2020, 10, 26, 10, 0, 0, 0), "type": "BUSY"}]
    expect(result).toEqual(expected)
  })
})