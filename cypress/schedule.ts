export function createDefaultSchedule(scheduleName: string): void {
  cy.contains("Add Schedule").click()
  cy.get("#name").type(scheduleName)
  cy.wait(2000)
  cy.contains("Save Schedule").click()
}

export function createCostumSchedule(scheduleName: string): void {
  cy.contains("Add Schedule").click()
  cy.get("#name").type(scheduleName)
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
}
