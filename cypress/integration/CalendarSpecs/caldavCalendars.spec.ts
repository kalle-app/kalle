import { loginAs } from "../../login"
import { url } from "../../support/url"
import { johnDoe } from "../../../db/seed-data"

const {
  calendars: { baikal },
} = johnDoe

function addCaldavCalendar(cal: Omit<typeof baikal, "encryptedPassword">) {
  loginAs(johnDoe)

  cy.visit(url("/settings"))

  cy.get("#add-calendar-button").click()

  cy.get("select").select("CalDav")

  cy.get("#caldav-name").type(cal.name)
  cy.get("#caldav-url").type(cal.caldavAddress)
  cy.get("#caldav-username").type(cal.username)
  cy.get("#caldav-password").type(cal.password)

  cy.get("#add-calendar").submit()
}

describe("Calendars", () => {
  it("are shown in the settings page", () => {
    loginAs(johnDoe)

    cy.visit(url("/settings"))

    cy.contains(baikal.name)
  })

  describe("when adding a valid calDav calendar", () => {
    it("works", () => {
      addCaldavCalendar({
        ...baikal,
        name: "Test-Cal",
      })

      cy.contains("Test-Cal")
    })
  })

  describe("when adding an invalid calendar", () => {
    it("works", () => {
      cy.on("window:alert", (str) => {
        expect(str).to.eq("Couldn't connect successfully: unauthorized")
      })

      addCaldavCalendar({
        ...baikal,
        name: "Invalid",
        password: "invalid",
      })
    })
  })
})
