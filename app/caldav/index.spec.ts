import { getTakenTimeSlots, getEvents, verifyConnectionDetails } from "./"
import fetch from "node-fetch"
import { skipWithoutDocker } from "test/skip-without-docker"

skipWithoutDocker()

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

describe("auth test", () => {
  describe("when given invalid credentials", () => {
    it("returns unauthorized", async () => {
      await expect(
        verifyConnectionDetails({
          url: "http://localhost:5232/dav.php/calendars/john.doe/test",
          auth: {
            username: "john.doe",
            password: "wrong-password",
            digest: true,
          },
        })
      ).resolves.toEqual({ fail: "unauthorized" })
    })
  })

  describe("when given invalid authentication method", () => {
    it("returns unauthorized", async () => {
      await expect(
        verifyConnectionDetails({
          url: "http://localhost:5232/dav.php/calendars/john.doe/test",
          auth: {
            username: "john.doe",
            password: "root",
            digest: false,
          },
        })
      ).resolves.toEqual({ fail: "unauthorized" })
    })
  })

  describe("when given non-existant url", () => {
    it("returns wrong_url", async () => {
      await expect(
        verifyConnectionDetails({
          url: "http://non-existant-calendar.com/",
          auth: {
            username: "john.doe",
            password: "root",
            digest: false,
          },
        })
      ).resolves.toEqual({ fail: "wrong_url" })
    })
  })

  describe("when given non-caldav url", () => {
    it("returns no_caldav_support", async () => {
      await expect(
        verifyConnectionDetails({
          url: "https://google.com/",
          auth: {
            username: "john.doe",
            password: "root",
            digest: false,
          },
        })
      ).resolves.toEqual({ fail: "no_caldav_support" })
    })
  })

  // We can use https://tools.ietf.org/html/rfc4791#section-6.2.1 to implement this,
  // but Baikal doesn't support it.
  describe.skip("when given valid webdav url, but not a calendar resource", () => {
    it("returns the normalised caldav base URL", async () => {
      await expect(
        verifyConnectionDetails({
          url: "http://localhost:5232/dav.php/john.doe",
          auth: {
            username: "john.doe",
            password: "root",
            digest: true,
          },
        })
      ).resolves.toEqual({
        fail: null,
        caldavBaseUrl: "http://localhost:5232/dav.php/calendars/john.doe/test",
      })
    })
  })

  describe("when given valid connection details", () => {
    it("returns the normalised caldav base URL", async () => {
      await expect(
        verifyConnectionDetails({
          url: "http://localhost:5232/dav.php/calendars/john.doe/test",
          auth: {
            username: "john.doe",
            password: "root",
            digest: true,
          },
        })
      ).resolves.toEqual({
        fail: null,
        caldavBaseUrl: "http://localhost:5232/dav.php/calendars/john.doe/test",
      })
    })
  })
})

describe("freeBusy", () => {
  it("without events", async () => {
    const result = await getTakenTimeSlots(
      baikalJohnDoe,
      new Date("2020-11-16T00:00:00.000Z"),
      new Date("2020-11-21T00:00:00.000Z")
    )
    const expected = []
    expect(result).toEqual(expected)
  })
  it("with events", async () => {
    const result = await getTakenTimeSlots(
      baikalJohnDoe,
      new Date("2020-11-23T00:00:00.000Z"),
      new Date("2020-11-28T00:00:00.000Z")
    )
    const expected = [
      { start: new Date("2020-11-25T11:00:00.000Z"), end: new Date("2020-11-25T13:00:00.000Z") },
      { start: new Date("2020-11-25T19:00:00.000Z"), end: new Date("2020-11-25T22:00:00.000Z") },
      { start: new Date("2020-11-26T09:00:00.000Z"), end: new Date("2020-11-26T11:00:00.000Z") },
    ]
    expect(result).toEqual(expected)
  })
})

describe("events", () => {
  it("without events", async () => {
    const result = await getEvents(
      baikalJohnDoe,
      new Date("2020-11-16T00:00:00.000Z"),
      new Date("2020-11-21T00:00:00.000Z")
    )
    const expected = []
    expect(result).toEqual(expected)
  })
  it("with events", async () => {
    const result = await getEvents(
      baikalJohnDoe,
      new Date("2020-11-23T00:00:00.000Z"),
      new Date("2020-11-28T00:00:00.000Z")
    )
    const expected = [
      {
        title: "Lunch",
        start: new Date("2020-11-25T11:00:00.000Z"),
        end: new Date("2020-11-25T13:00:00.000Z"),
      },
      {
        title: "Geburtstag",
        start: new Date("2020-11-25T19:00:00.000Z"),
        end: new Date("2020-11-25T22:00:00.000Z"),
      },
      {
        title: "Meeting",
        start: new Date("2020-11-26T09:00:00.000Z"),
        end: new Date("2020-11-26T11:00:00.000Z"),
      },
    ]
    expect(result).toEqual(expected)
  })
})
