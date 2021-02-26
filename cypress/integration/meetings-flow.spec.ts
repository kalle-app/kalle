import { loginAs } from "../login"
import { createMeeting } from "../meeting"
import { url } from "../support/url"
import * as uuid from "uuid"
import { addDays, addMonths, format, isFriday, isSaturday } from "date-fns"

import { johnDoe } from "../../db/seed-data"

describe("Meetings Flow", () => {
  it("Create Meeting", () => {
    const meetingLink = uuid.v4()
    loginAs(johnDoe)
    createMeeting(uuid.v4(), meetingLink)
    cy.contains(url(`/schedule/${johnDoe.username}/${meetingLink}`))
  })

  it("Creates Booking", () => {
    loginAs(johnDoe)
    const meetingLink = uuid.v4()
    const meetingName = uuid.v4()
    createMeeting(meetingName, meetingLink)
    cy.visit(url(`/schedule/${johnDoe.username}/${meetingLink}`))
    cy.wait(4000)
    const date = new Date()
    const dateToSelect = addMonths(date, 1).setDate(15)
    cy.get(".nice-dates-navigation_next").click()
    cy.wait(4000)
    cy.get(".nice-dates-grid").contains("15").click()
    cy.wait(2000)
    cy.contains("button", /10:30.*-11:00.*/).click()
    cy.contains("Schedule!").click()
    cy.get("#formBasicEmail").type("test-receiver@kalle.app")
    cy.contains("Submit!").click()
    cy.wait(5000)
    cy.request("http://localhost:8025/api/v2/messages").then((response) => {
      const {
        items: [newestMail],
      } = response.body
      cy.log(response.body)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(newestMail).to.exist
      expect(newestMail.Content.Headers.Subject[0]).to.equal(
        `New appointment: ${meetingName} - 10:30, ${format(dateToSelect, "dd.MM.y")} with john.doe`
      )
      expect(newestMail.Content.Headers.To[0]).to.equal("test-receiver@kalle.app")
    })
  })
})
