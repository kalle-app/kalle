import { filloutSignupFormWith, signupAs } from "../signup"
import { url } from "../support/url"
import { johnDoe } from "../../db/seed-data"
import * as uuid from "uuid"

describe("Signup Flow", () => {
  it("Can be reached over the home page", () => {
    cy.visit(url("/"))
    cy.contains("Sign up").click()
    cy.url().should("equal", url("/signup"))
  })

  describe("when using a taken username", () => {
    it('shows "This username is already being used"', () => {
      filloutSignupFormWith(johnDoe)
      cy.contains("This username is already being used")
    })
  })

  describe("when using a non-taken email", () => {
    it("works", () => {
      const username = "notabot-" + uuid.v4()
      const email = username + "@kalle.app"
      signupAs({
        email,
        username,
        fullName: "John Notabot",
        password: "my_Supersecure1password",
      })
      cy.get("#auth-dropdown").should("contain", email)
    })
  })
})
