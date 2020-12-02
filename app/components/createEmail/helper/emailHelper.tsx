import nodemailer from "nodemailer"
import Email from "email-templates"
import { checkEnvVariable } from "../../../../utils/checkEnvVariables"

export function sendEmail(): Email {
  checkIfSMTPEnvVariablesExist()

  const transporter = createSMTPConnection()
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

function createSMTPConnection(): nodemailer.Transporter {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!, 10),
    secure: false, //TODO upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

function checkIfSMTPEnvVariablesExist(): void {
  ;["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "EMAIL_FROM", "MODE"].forEach((v) =>
    checkEnvVariable(v)
  )
}
