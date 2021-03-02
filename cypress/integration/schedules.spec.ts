import { loginAs } from "../login"
import { createDefaultSchedule, createCostumSchedule } from "../schedule"
import { url } from "../support/url"
import * as uuid from "uuid"

import { johnDoe } from "../../db/seed-data"

describe("Schedules", () => {
  it("Create default schedule", () => {
    loginAs(johnDoe)
    cy.visit(url("/schedules"))
    const nameDefault = uuid.v4()
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    createDefaultSchedule(nameDefault)
    cy.contains(nameDefault)
      .parent()
      .contains("Timezone")
      .parent()
      .parent()
      .contains(clientTimeZone)
    cy.contains(nameDefault).parent().contains("Friday:").parent().parent().contains("9:00 - 17:00")
    cy.contains(nameDefault)
      .parent()
      .contains("Saturday")
      .parent()
      .parent()
      .contains("9:00 - 17:00")
      .should("not.exist")
  })
  it("Create costum schedule", () => {
    loginAs(johnDoe)
    cy.visit(url("/schedules"))
    const nameCostum = uuid.v4()
    createCostumSchedule(nameCostum)
    cy.contains(nameCostum).parent().contains("Timezone").parent().parent().contains("Asia/Seoul")
    cy.contains(nameCostum).parent().contains("Friday:").parent().parent().contains("7:00 - 17:00")
    cy.contains(nameCostum).parent().contains("Saturday").parent().parent().contains("9:00 - 17:00")
  })
  it("Delete default schedule", () => {
    loginAs(johnDoe)
    cy.visit(url("/schedules"))
    const nameDefault = uuid.v4()
    createDefaultSchedule(nameDefault)
    cy.contains(nameDefault)
    cy.get("#delete-" + nameDefault).click()
    cy.wait(2000)
    cy.contains(nameDefault).should("not.exist")
  })
})
