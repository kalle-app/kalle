import { url } from "./support/url"
import type { johnDoe } from "../db/seed-data"

export function filloutLoginFormWith(user: Pick<typeof johnDoe, "email" | "password">) {
  cy.visit(url("/login"))
  cy.get("#email").type(user.email)
  cy.get("#password").type(user.password)
  cy.get("#login").click()
}

export function loginAs(user: Pick<typeof johnDoe, "email" | "password">) {
  filloutLoginFormWith(user)
  cy.url().should("equal", url("/"))
}
