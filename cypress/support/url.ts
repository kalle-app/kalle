export function url(value: string) {
  return `http://${Cypress.env("host")}:${Cypress.env("port")}${value}`
}
