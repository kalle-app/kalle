import { loginAs } from "../login"
import { url } from "../support/url"
import * as uuid from "uuid"

import { johnDoe } from "../../db/seed-data"

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

  cy.get("#range-start").type("20.11.2020")
  cy.get("#range-end").type("27.11.2020")

  cy.contains("Add Schedule").click()

  const scheduleName = uuid.v4()

  cy.get("#name").type(scheduleName)

  cy.contains("Save Schedule").click()

  cy.get("#select-schedule").select(scheduleName)

  cy.get("#submit").click()
  cy.get("#submit").click()
  cy.get("#submit").click()

  cy.contains(url(`/schedule/${johnDoe.username}/${link}`))

  cy.visit(url(`/schedule/${johnDoe.username}/${link}`))

  cy.contains("23").click()
  cy.contains("10:30-10:45").click()

  cy.contains("Schedule!").click()

  cy.get("#formBasicEmail").type("test-receiver@kalle.app")

  cy.contains("Submit!").click()

  cy.wait(1000)

  cy.request("http://localhost:8025/api/v2/messages").then((response) => {
    const {
      items: [newestMail],
    } = response.body

    cy.log(newestMail)

    expect(newestMail).to.exist

    expect(newestMail.Content.Headers.Subject[0]).to.equal(
      "New appointment: My Test Meeting - 10:30, 23.11.2020 mit john.doe"
    )
    expect(newestMail.Content.Headers.To[0]).to.equal("test-receiver@kalle.app")
  })
})
