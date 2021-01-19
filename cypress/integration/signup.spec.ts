import { url } from "../support/url"
import { johnDoe } from "../../db/seed-data"
import * as uuid from "uuid"

function filloutSignupFormWith(
  user: Pick<typeof johnDoe, "email" | "fullName" | "password" | "username">
) {
  cy.get("#fullName").type(user.fullName)
  cy.get("#username").type(user.username)
  cy.get("#email").type(user.email)
  cy.get("#password").type(user.password)
  cy.get("#signup").click()
}

describe("Signup Flow", () => {
  it("Can be reached over the home page", () => {
    cy.visit(url("/"))
    cy.contains("Sign up").click()
    cy.url().should("equal", url("/signup"))
  })

  describe("when using a taken username", () => {
    it('shows "This username is already being used"', () => {
      cy.visit(url("/signup"))
      filloutSignupFormWith(johnDoe)
      cy.contains("This username is already being used")
    })
  })

  describe("when using a non-taken email", () => {
    it("works", () => {
      cy.visit(url("/signup"))
      const username = "notabot-" + uuid.v4()
      const email = username + "@kalle.app"
      filloutSignupFormWith({
        email,
        username,
        fullName: "John Notabot",
        password: "mysupersecurepassword",
      })
      cy.url().should("equal", url("/"))
      cy.get("#auth-dropdown").should("contain", email)
    })
  })
})
