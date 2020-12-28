import { loginAs } from "../login"
import { url } from "../support/url"
import * as uuid from "uuid"

import { johnDoe } from "../user-data"

it("Meetings Flow", () => {
  const link = uuid.v4()

  loginAs(johnDoe)

  cy.visit(url("/meetings"))

  cy.contains("Create new Meeting").click()
  cy.get("#name").type("My Test Meeting")
  cy.get("#link").type(link)
  cy.get("#description").type("Lorem ipsum, dolor sit amet.")

  cy.get("#submit").click()

  cy.get("#duration-30").click()

  cy.get("#range-start").type("20-11-2020")
  cy.get("#range-end").type("27-11-2020")

  cy.get("#submit").click()
  cy.get("#submit").click()
  cy.get("#submit").click()

  cy.contains("Lorem ipsum, dolor sit amet.")
  cy.contains(url(`/schedule/1/${link}`))

  cy.visit(url(`/schedule/1/${link}`))

  cy.contains("22").click()
  cy.contains("09:30-09:45").click()

  cy.get("#submit").click()

  cy.request("http://localhost:8025/api/v2/messages").then((response) => {
    const {
      items: [newestMail],
    } = response.body

    expect(newestMail.Content.Headers.Subject[0]).to.equal(
      "New appointment: My Test Meeting - 9:30, 22.12.2020 mit Kalle app"
    )
  })
})
