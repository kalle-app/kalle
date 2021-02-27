import { url } from "./support/url"
import type { johnDoe } from "../db/seed-data"

export function filloutSignupFormWith(
  user: Pick<typeof johnDoe, "email" | "fullName" | "password" | "username">
) {
  cy.visit(url("/signup"))
  cy.get("#fullName").type(user.fullName)
  cy.get("#username").type(user.username)
  cy.get("#email").type(user.email)
  cy.get("#password").type(user.password)
  cy.get("#signup").click()
}

export function signupAs(
  user: Pick<typeof johnDoe, "email" | "fullName" | "password" | "username">
) {
  filloutSignupFormWith(user)
  cy.url().should("equal", url("/"))
}
