describe("Landing Page", () => {
  it("displays the headpage", () => {
    cy.visit("http://localhost:3000")
    cy.contains("Sign up")
  })
})
