import { EmailConfirmation } from "../emailCollection/emailConfirmation"
import EmailFactory from "../EmailFactory"
export default async function sendMail(properties: any) {
  let email
  if (properties.type === "confirmation") {
    email = new EmailConfirmation(properties.appointment)
  } else if (properties.type === "request") {
    //TODO
  } else {
    email = new EmailFactory()
  }
  return email.sendEmail()
}
