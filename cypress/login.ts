import { url } from "./support/url"
import type { johnDoe } from "../db/seed-data"

function filloutLoginFormWith(user: Pick<typeof johnDoe, "email" | "password">) {
  cy.get("#email").type(user.email)
  cy.get("#password").type(user.password)
  cy.get("#login").click()
  cy.url().should("equal", url("/"))
}

export function loginAs(user: Pick<typeof johnDoe, "email" | "password">) {
  cy.visit(url("/login"))
  filloutLoginFormWith(user)
}
