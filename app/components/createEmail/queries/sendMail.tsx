import { EmailConfirmation } from "../emailCollection/emailConfirmation"

export default async function sendMail(properties: any) {
  let email
  if (properties.type === "confirmation") {
    email = new EmailConfirmation(properties.appointment)
  } else if (properties.type === "request") {
    //TODO
    return null
  } else {
    return null
  }

  return email.sendEmail()
}
