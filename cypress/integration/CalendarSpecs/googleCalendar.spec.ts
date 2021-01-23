import { loginAs } from "../../login"
import { url } from "../../support/url"
import * as uuid from "uuid"
import { johnDoe } from "../../../db/seed-data"

describe("A Google Calendar", () => {
  it("can be selected in settings", () => {
    loginAs(johnDoe)
    cy.contains("Connect a Calendar!").click()
    cy.get("#add-calendar-button").click()
    cy.get("select").select("Google Calendar")
  })
  it("offers link to Google login ", () => {
    cy.get("#google-login-button")
    cy.clearCookies()
  })
})

// TODO Manage Social Login, see https://github.com/lirantal/cypress-social-logins/issues/78
// describe("Login", () => {
//   it("Login through Google", () => {
//     const username = Cypress.env("googleSocialLoginUsername")
//     const password = Cypress.env("googleSocialLoginPassword")
//     const loginUrl = Cypress.env("loginUrl")
//     const cookieName = Cypress.env("cookieName")
//     const socialLoginOptions = {
//       username,
//       password,
//       loginUrl: Cypress.env("loginUrl"),
//       headless: false,
//       logs: true,
//       loginSelector: '[href="/auth/auth0/google-oauth2"]',
//       // loginSelector: 'a[href="https://www.googleapis.com/auth/calendar"]',
//       postLoginSelector: ".account-panel",
//     }
//     console.log("options: ", socialLoginOptions)

//     return cy.task("GoogleSocialLogin", socialLoginOptions).then(({ cookies }) => {
//       console.log("clear cookies now :)")

//       cy.clearCookies()
//       console.log("return!")

//       const cookie = cookies.filter((cookie) => cookie.name === cookieName).pop()
//       if (cookie) {
//         console.log("cookie!")

//         cy.setCookie(cookie.name, cookie.value, {
//           domain: cookie.domain,
//           expiry: cookie.expires,
//           httpOnly: cookie.httpOnly,
//           path: cookie.path,
//           secure: cookie.secure,
//         })
//         Cypress.Cookies.defaults({
//           preserve: cookieName,
//         })
//       }
//     })
//   })
// })
