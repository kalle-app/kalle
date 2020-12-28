import { url } from "../support/url"
import { johnDoe } from "../user-data"
import * as uuid from "uuid"

function filloutSignupFormWith(user: typeof johnDoe) {
  cy.get("#fullName").type(user.fullName)
  cy.get("#email").type(user.email)
  cy.get("#password").type(user.password)
  cy.get("#signup").click()
}

describe("Signup Flow", () => {
  it("Can be reached over the home page", () => {
    cy.visit(url("/"))
    cy.contains("Sign up").click()
    cy.url().should("contain", url("/signup"))
  })

  describe("when using a taken email", () => {
    it('shows "This email is already being used"', () => {
      cy.visit(url("/signup"))
      filloutSignupFormWith(johnDoe)
      cy.contains("This email is already being used")
    })
  })

  describe("when using a non-taken email", () => {
    it("works", () => {
      cy.visit(url("/signup"))
      const email = `notabot${uuid.v4()}@kalle.app`
      filloutSignupFormWith({
        email,
        fullName: "John Notabot",
        password: "mysupersecurepassword",
      })
      cy.url().should("contain", url("/"))
      cy.get("#auth-dropdown").should("contain", email)
    })
  })
})
