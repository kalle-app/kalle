export function url(value: string) {
  return `${Cypress.env("host")}:${Cypress.env("port")}${value}`
}
