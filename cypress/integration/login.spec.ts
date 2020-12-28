import { url } from "../support/url"
import { johnDoe } from "../user-data"
import * as uuid from "uuid"

function filloutLoginFormWith(user: Pick<typeof johnDoe, "email" | "password">) {
  cy.get("#email").type(user.email)
  cy.get("#password").type(user.password)
  cy.get("#login").click()
}

describe("Login Flow", () => {
  it("Can be reached over the home page", () => {
    cy.visit(url("/"))
    cy.contains("Log In").click()
    cy.url().should("contain", url("/login"))
  })

  describe("when using valid credentials", () => {
    it("Redirects to /", () => {
      cy.visit(url("/login"))
      filloutLoginFormWith(johnDoe)
      cy.url().should("contain", url("/"))
    })
  })

  describe("when using invalid credentials", () => {
    it('shows "This email is already being used"', () => {
      cy.visit(url("/login"))
      filloutLoginFormWith({
        email: johnDoe.email,
        password: "wrongpassword",
      })
      cy.contains("Sorry, those credentials are invalid")
    })
  })
})
