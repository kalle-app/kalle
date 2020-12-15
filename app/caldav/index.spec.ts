import { getTakenTimeSlots, getEvents, verifyConnectionDetails } from "./"
import { GenericContainer, StartedTestContainer } from "testcontainers"
import * as path from "path"
import { ExternalEvent } from "app/appointments/types"

describe("caldav stuff", () => {
  let baseUrl: string

  let baikalContainer: StartedTestContainer

  beforeAll(async () => {
    jest.setTimeout(60 * 1000)

    baikalContainer = await new GenericContainer("ckulka/baikal", "nginx")
      .withExposedPorts(80)
      .withBindMount(
        path.join(__dirname, "../../test/baikal/Specific"),
        "/var/www/baikal/Specific",
        "rw"
      )
      .withBindMount(
        path.join(__dirname, "../../test/baikal/config"),
        "/var/www/baikal/config",
        "rw"
      )
      .start()

    baseUrl = `http://${baikalContainer.getHost()}:${baikalContainer.getMappedPort(80)}`
  })

  afterAll(async () => {
    await baikalContainer.stop()
  })

  function getBaikalJohnDoeConnection() {
    return {
      url: baseUrl + "/dav.php/calendars/john.doe/test",
      auth: {
        username: "john.doe",
        password: "root",
        digest: true,
      },
    }
  }

  describe("auth test", () => {
    describe("when given invalid credentials", () => {
      it("returns unauthorized", async () => {
        await expect(
          verifyConnectionDetails(
            baseUrl + "/dav.php/calendars/john.doe/test",
            "john.doe",
            "wrong-password"
          )
        ).resolves.toEqual({ fail: "unauthorized" })
      })
    })

    describe("when given non-existant url", () => {
      it("returns wrong_url", async () => {
        await expect(
          verifyConnectionDetails("http://non-existant-calendar.com/", "john.doe", "root")
        ).resolves.toEqual({ fail: "wrong_url" })
      })
    })

    describe("when given non-caldav url", () => {
      it("returns no_caldav_support", async () => {
        await expect(
          verifyConnectionDetails("https://google.com/", "john.doe", "root")
        ).resolves.toEqual({ fail: "no_caldav_support" })
      })
    })

    // We can use https://tools.ietf.org/html/rfc4791#section-6.2.1 to implement this,
    // but Baikal doesn't support it.
    describe.skip("when given valid webdav url, but not a calendar resource", () => {
      it("returns the normalised caldav base URL", async () => {
        await expect(
          verifyConnectionDetails(baseUrl + "/dav.php/john.doe", "john.doe", "root")
        ).resolves.toEqual({
          fail: null,
          caldavBaseUrl: "http://localhost:5232/dav.php/calendars/john.doe/test",
        })
      })
    })

    describe("when given an url without a protocol", () => {
      it("assumes https and fails b/c Baikal doesnt support it", async () => {
        await expect(
          verifyConnectionDetails(
            baseUrl.replace("http://", "") + "/dav.php/john.doe",
            "john.doe",
            "root"
          )
        ).resolves.toEqual({
          fail: "wrong_protocol",
        })
      })
    })

    describe("when given valid details", () => {
      it("returns the connection details including the correct auth method", async () => {
        await expect(
          verifyConnectionDetails(baseUrl + "/dav.php/calendars/john.doe/test", "john.doe", "root")
        ).resolves.toEqual({
          fail: null,
          connectionDetails: {
            url: baseUrl + "/dav.php/calendars/john.doe/test",
            auth: {
              username: "john.doe",
              password: "root",
              digest: true,
            },
          },
        })
      })
    })
  })

  describe("freeBusy", () => {
    it("without events", async () => {
      const result = await getTakenTimeSlots(
        getBaikalJohnDoeConnection(),
        new Date("2020-11-16T00:00:00.000Z"),
        new Date("2020-11-21T00:00:00.000Z")
      )
      const expected: ExternalEvent[] = []
      expect(result).toEqual(expected)
    })
    it("with events", async () => {
      const result = await getTakenTimeSlots(
        getBaikalJohnDoeConnection(),
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
        getBaikalJohnDoeConnection(),
        new Date("2020-11-16T00:00:00.000Z"),
        new Date("2020-11-21T00:00:00.000Z")
      )
      const expected: ExternalEvent[] = []
      expect(result).toEqual(expected)
    })
    it("with events", async () => {
      const result = await getEvents(
        getBaikalJohnDoeConnection(),
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
})
