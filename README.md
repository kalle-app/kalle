[![Blitz.js](https://raw.githubusercontent.com/blitz-js/art/master/github-cover-photo.png)](https://blitzjs.com)

This is a [Blitz.js](https://github.com/blitz-js/blitz) app.

# Setup

## Getting started

Follow these steps for a development environment:

```
npm install
```

Now you have to create a `.env.local` file in your root folder.

This should contain the following properties:

```
DATABASE_URL="file:./db.sqlite"
EMAIL_FROM="email_address" //email-domain which will be used for email shipping
SMTP_USER="Insert SMTP Username"
SMTP_PASSWORD="Insert SMTP Password"
SMTP_PORT="Insert PORT to connect to the SMTP-Server, usually 587"
SMTP_HOST="Insert HOST_Name of SMTP-Server"
```

Finally you can start the app via:
`blitz start`

## Email-Setup

Go to page: `/email/test` and click on the button: `Email versenden`.
