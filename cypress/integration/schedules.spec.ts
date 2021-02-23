import { loginAs } from "../login"
import { url } from "../support/url"
import * as uuid from "uuid"
import { addDays, format, isFriday, isSaturday } from "date-fns"

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
  createDefaultSchedule(name)
})
