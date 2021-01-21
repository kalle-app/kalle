import nodemailer from "nodemailer"
import Email from "email-templates"
import { checkEnvVariables } from "../utils/checkEnvVariables"
import { singleton } from "utils/singleton"

export const getEmailService = singleton(() => {
  checkEnvVariables("SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "EMAIL_FROM")

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!, 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  return new Email({
    message: {
      from: process.env.EMAIL_FROM,
    },
    send: true,
    transport: transporter,
    preview: false,
    views: {
      options: {
        extension: "hbs",
      },
    },
  })
})
