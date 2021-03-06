import { signupAs } from "../signup"
import { loginAs } from "../login"
import { url } from "../support/url"
import * as uuid from "uuid"

function filloutUpdateFormWith(name: string, email: string, password: string) {
  cy.get("#formName").type(name)
  cy.get("#formEmail").type(email)
  cy.get("#formPassword").type(password)
  cy.get("#formRepeatPassword").type(password)
  cy.contains("Update Information").click()
}

describe("Account", () => {
  it("delete account", () => {
    const username = uuid.v4()
    const email = username + "@kalle.app"
    signupAs({
      email,
      username,
      fullName: "Jane Doe",
      password: "my_Supersecure1password",
    })
    cy.visit(url("/settings"))
    cy.contains("Delete your Account").click()
    cy.url().should("equal", url("/"))
  })
  it("change email", () => {
    const username = uuid.v4()
    const email = username + "@kalle.app"
    signupAs({
      email,
      username,
      fullName: "Jane Doe",
      password: "my_Supersecure1password",
    })
    cy.visit(url("/settings"))
    const newMail = uuid.v4() + "@kalle.app"
    filloutUpdateFormWith("Jane Doe", newMail, "my_Supersecure1password")
    cy.get("#auth-dropdown").should("contain", newMail)
  })
  it("change password", () => {
    const username = uuid.v4()
    const email = username + "@kalle.app"
    signupAs({
      email,
      username,
      fullName: "Jane Doe",
      password: "my_Supersecure1password",
    })
    cy.visit(url("/settings"))
    filloutUpdateFormWith("Jane Doe", email, "test_Supersecure1234pw")
    cy.get("#auth-dropdown").click()
    cy.contains("Sign out").click()
    loginAs({ email: email, password: "test_Supersecure1234pw" })
  })
})
