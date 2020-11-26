import { createSMTPConnection } from "./helper/createSMTPConnection"
import * as Email from "email-templates";

export default class EmailFactory {
  private transporter: any
  protected email: typeof Email

  constructor() {
    this.transporter = null
    this.email = null
  }

  sendEmail() {
    this.transporter = createSMTPConnection()
    this.email = new Email({
      message: {
        from: process.env.EMAIL_FROM,
      },
      transport: this.transporter,
      send: false,
      views: {
        options: {
          extension: "hbs",
        },
      },
    })
    this.buildEmail()
  }

  buildEmail() {
    throw new Error("Abstract Method!")
  }
}
