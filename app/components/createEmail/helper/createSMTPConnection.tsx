let nodemailer = require("nodemailer")

export function createSMTPConnection() {
  const transporter = createTransporter()
  verifyConnection(transporter)
  return transporter
}

function createTransporter() {
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

function verifyConnection(transporter) {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error)
      throw new Error("Connection to SMTP-Server failed")
    } else {
      console.log("SMTP-Connection established")
      return success
    }
  })
}
