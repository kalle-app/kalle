import { signupAs } from "../signup"
import { url } from "../support/url"
import * as uuid from "uuid"

describe("Account", () => {
  it("delete account", () => {
    const username = uuid.v4()
    const email = username + "@kalle.app"
    signupAs({
      email,
      username,
      fullName: "Jane Doe",
      password: "mysupersecurepassword",
    })
    cy.visit(url("/settings"))
    cy.contains("Delete your Account").click()
    cy.url().should("equal", url("/"))
  })
})
