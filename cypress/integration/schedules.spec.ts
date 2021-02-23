import { loginAs } from "../login"
import { url } from "../support/url"
import * as uuid from "uuid"

import { johnDoe } from "../../db/seed-data"

export function createDefaultSchedule(scheduleName: string): void {
  cy.contains("Add Schedule").click()
  cy.get("#name").type(scheduleName)
  cy.wait(2000)
  cy.contains("Save Schedule").click()
}

it("Schedules", () => {
  loginAs(johnDoe)

  cy.visit(url("/schedules"))
  const name = uuid.v4()
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  createDefaultSchedule(name)
  cy.contains(name).parent().contains("Timezone").parent().parent().contains(clientTimeZone)
  cy.contains(name).parent().contains("Friday:").parent().parent().contains("9:00 - 17:00")
  cy.contains(name).parent().contains("Saturday").should("not.exist")
  //TODO test schedule delition, once implemented

  const nameOfNotDefaultSchedule = uuid.v4()
  cy.contains("Add Schedule").click()
  cy.get("#name").type(nameOfNotDefaultSchedule)
  cy.wait(2000)
  cy.get("form").within(() => {
    cy.get(".dropdown").get("a").click()
    cy.get('input[placeholder="Type to filter..."]').type("seo")
    cy.get('input[placeholder="Type to filter..."]').parent().contains("Madrid").should("not.exist")
    cy.contains("Asia/Seoul").click()
    cy.contains("Friday").parent().parent().find('input[value="09:00"]').type("{selectall}07:00")
    cy.contains("Saturday").parent().parent().find('[type="checkbox"]').uncheck()
  })
  cy.contains("Save Schedule").click()
  cy.contains(nameOfNotDefaultSchedule)
    .parent()
    .contains("Timezone")
    .parent()
    .parent()
    .contains("Asia/Seoul")
  cy.contains(nameOfNotDefaultSchedule)
    .parent()
    .contains("Friday:")
    .parent()
    .parent()
    .contains("7:00 - 17:00")
  cy.contains(nameOfNotDefaultSchedule).parent().contains("Saturday")
})
