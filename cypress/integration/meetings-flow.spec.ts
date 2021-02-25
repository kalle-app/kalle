import { loginAs } from "../login"
import { url } from "../support/url"
import * as uuid from "uuid"
import { addDays, format, isFriday, isSaturday } from "date-fns"

import { johnDoe } from "../../db/seed-data"
import { createDefaultSchedule } from "./schedules.spec"

it("Meetings Flow", () => {
  const link = uuid.v4()
  const meetingName = `My Test Meeting-${Math.floor(Math.random() * 10000)}`
  const date = new Date()
  const dateToSelect = isFriday(date) || isSaturday(date) ? addDays(date, 3) : addDays(date, 1)
  const dateStart = format(date, "dd.MM.y")
  const dateEnd = format(addDays(date, 14), "dd.MM.y")

  loginAs(johnDoe)

  cy.visit(url("/meetings"))

  cy.contains("Create new Meeting").click()
  cy.get("#name").type(meetingName)
  cy.get("#link").type(link)
  cy.get("#description").type("Lorem ipsum, dolor sit amet.")
  cy.get("#location").type("Berlin")

  cy.get("#submit").click()

  cy.get("#duration-30").click()

  cy.get("#range-start").type(dateStart)
  cy.get("#range-end").type(dateEnd)

  const scheduleName = uuid.v4()

  createDefaultSchedule(scheduleName)

  cy.get("#select-schedule").select(scheduleName)

  cy.get("#submit").click()

  cy.contains(url(`/schedule/${johnDoe.username}/${link}`))
  cy.visit(url(`/schedule/${johnDoe.username}/${link}`))

  cy.contains(format(dateToSelect, "d")).click()
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

    expect(newestMail).to.exist

    expect(newestMail.Content.Headers.Subject[0]).to.equal(
      `New appointment: ${meetingName} - 10:30, ${format(dateToSelect, "dd.MM.y")} with john.doe`
    )
    expect(newestMail.Content.Headers.To[0]).to.equal("test-receiver@kalle.app")
  })

  cy.visit(url(`/meetings`))
  cy.contains(meetingName)

  cy.contains(meetingName).parent().parent().contains("Delete").click()
  cy.contains(meetingName).parent().parent().parent().contains("There are still active bookings")

  cy.get(`button[id="booking-btn-${meetingName}"]`).click()
  cy.contains("Lorem ipsum, dolor sit amet.")
  cy.contains(format(dateToSelect, "d"))
  cy.contains("test-receiver@kalle.app")
})
