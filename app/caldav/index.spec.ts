import { freeBusy } from "./"
import fetch from "node-fetch"

const baikalJohnDoe = {
  url: "http://localhost:5232/dav.php/calendars/john.doe/default/",
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
    expect(result).toEqual(`
    `)
  })
})
