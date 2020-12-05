import nodemailer from "nodemailer"
import Email from "email-templates"
import { checkEnvVariable } from "../../../../utils/checkEnvVariables"

export class EmailProvider
{
  private static _connection: Email

  private constructor() {}

  getMailService(): Email {
  this.checkIfSMTPEnvVariablesExist()

  const transporter = this.createSMTPConnection()
    return new Email({
    message: {
      from: process.env.EMAIL_FROM,
    },
    transport: transporter,
    send: process.env.MODE !== "development",
    views: {
      options: {
        extension: "hbs",
      },
    },
  })
}

  createSMTPConnection(): nodemailer.Transporter {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!, 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

  checkIfSMTPEnvVariablesExist(): void {
  ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "EMAIL_FROM", "MODE"].forEach((env) =>
    checkEnvVariable(env)
  )
}

  public static get Connection()
  {
    return this._connection || (this._connection = new this().getMailService());
  }
}







