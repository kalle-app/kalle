import { loginAs } from "../login"
import { url } from "../support/url"
import { johnDoe } from "../user-data"

describe("Login Flow", () => {
  it("Can be reached over the home page", () => {
    cy.visit(url("/"))
    cy.contains("Log In").click()
    cy.url().should("equal", url("/login"))
  })

  describe("when using valid credentials", () => {
    it("Redirects to /", () => {
      loginAs(johnDoe)
      cy.url().should("equal", url("/"))
    })
  })

  describe("when using invalid credentials", () => {
    it('shows "Sorry, those credentials are invalid"', () => {
      loginAs({
        email: johnDoe.email,
        password: "wrongpassword",
      })
      cy.contains("Sorry, those credentials are invalid")
    })
  })
})
