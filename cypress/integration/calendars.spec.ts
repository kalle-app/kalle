import { loginAs } from "../login"
import { url } from "../support/url"
import { johnDoe } from "../user-data"

const {
  calendars: { baikal },
} = johnDoe

function addCalendar(cal: Omit<typeof baikal, "encryptedPassword">) {
  loginAs(johnDoe)

  cy.visit(url("/settings"))

  cy.get("#add-calendar-button").click()

  cy.get("#name").type(cal.name)
  cy.get("#url").type(cal.caldavAddress)
  cy.get("#type").select("CalDav")
  cy.get("#username").type(cal.username)
  cy.get("#password").type(cal.password)

  cy.get("#add-calendar").submit()
}

describe("Calendars", () => {
  it("are shown in the settings page", () => {
    loginAs(johnDoe)

    cy.visit(url("/settings"))

    cy.contains(baikal.name)
  })

  describe("when adding a valid calendar", () => {
    it("works", () => {
      addCalendar({
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

      addCalendar({
        ...baikal,
        name: "Invalid",
        password: "invalid",
      })
    })
  })
})
