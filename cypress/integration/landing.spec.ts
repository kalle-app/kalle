import { url } from "../support/url"

describe("Landing Page", () => {
  it("displays the headpage", () => {
    cy.visit(url("/"))
    cy.contains("Sign up")
  })
})
