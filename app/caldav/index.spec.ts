import { freeBusy } from "./"

const baikalJohnDoe = {
  url: "http://localhost:5232/dav.php/calendars/john.doe/default/",
  auth: {
    username: "john.doe",
    password: "root",
    digest: true,
  },
}

describe("freeBusy", () => {
  it("returns a freeBusy schedule", async () => {
    const result = await freeBusy(baikalJohnDoe)
    expect(result).toEqual(`
    `)
  })
})
