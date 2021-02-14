import { johnDoe } from "../../../db/seed-data"
import { loginAs } from "../../login"
import { url } from "../../support/url"

describe("A Google Calendar", () => {
  it("can be selected under calendars", () => {
    loginAs(johnDoe)
    cy.visit(url("/calendars"))
    cy.get("#add-calendar-button").click()
    cy.get("select").select("Google Calendar")
  })
  it("offers link to Google login ", () => {
    cy.get("#google-login-button")
    cy.clearCookies()
  })
})

// On the matter of testing the Google Social Login, see https://github.com/lirantal/cypress-social-logins/issues/78
