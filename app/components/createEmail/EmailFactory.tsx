import { connectToSMTP } from "./helper/smtpConnection"
const Email = require("email-templates")

export default class EmailFactory {
  private transporter: any
  protected email: typeof Email

  constructor() {
    this.transporter = null
    this.email = null
  }

  sendEmail() {
    this.transporter = connectToSMTP()
    this.email = new Email({
      message: {
        from: process.env.EMAIL_FROM,
      },
      transport: this.transporter,
      send: true,
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
