<p align="center"><img width="300" height="300" src="public/logo.png" alt="Logo"></p>

<h1 align="center" style=font-size:200px>Kalle - The CalDav Scheduling Tool</h1>

<p align="center">
  <img src="https://img.shields.io/github/stars/kalle-app/kalle?style=for-the-badge">
  <a href="https://kalle.app"><img src="https://img.shields.io/website?down_color=lightgrey&down_message=offline&label=Kalle.app&style=for-the-badge&up_color=green&up_message=online&url=https%3A%2F%2Fkalle.app"></a>
  <a href="https://github.com/kalle-app/kalle/issues"><img src="https://img.shields.io/github/issues-closed-raw/kalle-app/kalle?style=for-the-badge"></a>
  <img src="https://img.shields.io/github/languages/top/kalle-app/kalle?style=for-the-badge">
  <img src="https://img.shields.io/github/license/kalle-app/kalle?style=for-the-badge">
</p>


## Overview

Kalle is an **appointment scheduling tool** that allows you to schedule an appointment with customers, colleagues or friends within seconds. We support self-hosted CalDav-based calendars and solutions such as authenticating your Google calendar.

Kalle is a modern web app that is built with [Blitz.js](https://github.com/blitz-js/blitz), a full-stack React framework, made to boost productivity.
A hosted version can be found at [**kalle.app**](https://www.kalle.app/).

_This Project is part of the "Trends und Konzepte dynamischer Web-Anwendungen" Project Seminar 2020/21 at the Hasso-Plattner-Institute._

## Testimonials

[![](./.github/resources/testimonials/_laugengebaeck.png)](https://twitter.com/_laugengebaeck/status/1368519898587086850)
[![](./.github/resources/testimonials/lorikarikari.png)](https://twitter.com/LoriKarikari/status/1368522759299534848)
[![](./.github/resources/testimonials/jolg42.png)](https://twitter.com/Jolg42/status/1368557953800888320)

> Kalle is a godsend tool that treated my eczema in a matter of days. Looking forward to bikini season!
> ~ [Natalia Woroniec](https://twitter.com/NWoroniec)

## Features

<table>
  <thead>
    <tr>
      <th>✨</th>
      <th>Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✅</td>
      <td>Create an account</td>
    </tr>
    <tr>
      <td>📆</td>
      <td>Connect CalDav calendars</td>
    </tr>
    <tr>
      <td>📆</td>
      <td>Connect Google calendars</td>
    </tr>
    <tr>
      <td>📆</td>
      <td>Connect Outlook calendars</td>
    </tr>
    <tr>
      <td>🤝</td>
      <td>Create a meeting</td>
    </tr>
    <tr>
      <td>📲</td>
      <td>Book an appointment</td>
    </tr>
    <tr>
      <td>❌</td>
      <td>Cancel an appointment</td>
    </tr>
    <tr>
      <td>⏱</td>
      <td>Use schedule presets</td>
    </tr>
    <tr>
      <td>🗓 📆</td>
      <td>Use multiple calendars</td>
    </tr>
    <tr>
      <td>🔎</td>
      <td>Compare invitee`s calendar</td>
    </tr>
    <tr>
      <td>✉️</td>
      <td>Email confirmations and reminders</td>
    </tr>
    <tr>
      <td>👩🏻‍🎨</td>
      <td>Select for each meeting a calendar where to book your appointments</td>
    </tr>
  </tbody>
</table>

## Getting Started

### Setup

Follow these steps for a development environment:

Make sure you have installed [Docker](https://docs.docker.com/get-docker/) on your system and set the appropriate permissions. Then run the following command:

```
npm install
```

Now you have to create a `.env.local` file in your root folder.

This should contain the following properties:

```
DATABASE_URL="postgres://user:password@hostname:port/database"
EMAIL_FROM="changeme@yourdomain.com"
SMTP_USER="Insert SMTP username"
SMTP_PASSWORD="Insert SMTP password"
SMTP_PORT="Insert the PORT of the SMTP server, usually 587"
SMTP_HOST="Insert the HOSTNAME of the SMTP server"
MODE="DEVELOPMENT"
HOME_URL="URL where kalle is deployed from: http://localhost:3000"
GOOGLE_CLIENT_ID="OAuth token to use Google calendars"
GOOGLE_CLIENT_SECRET="OAuth token to use Google calendars"
MICROSOFT_CLIENT_SECRET="OAuth token to use Outlook calendars"
MICROSOFT_CLIENT_ID="OAuth token to use Outlook calendars"
```

When mode !== development mails will be sent!

### Running the Application

Running `npm run dev` will start up a server which can be reached over the specified URL :)
It will also start up the PostgreSQL database, a Baikal server containing a calendar for experimental purposes, a Nextcloud server, the Quirrel job queue and Mailhog.

### Using Google Calendar and Outlook Calendar

We provide an interface to different calendar providers via OAuth 2.0. If you want to host your own Kalle instance and use one of the calendar providers, you will have to set some environment variables:

1. Google Calendar: You have to get a `CLIENT_ID` and a `CLIENT_SECRET`. For that you can start [here](https://developers.google.com/identity/protocols/oauth2). Save these values in the in environment variables `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
2. Microsoft Outlook: This works similar to Google Calendar. You have to get a `CLIENT_ID` and a `CLIENT_SECRET` (see [here](https://docs.microsoft.com/de-de/graph/auth-v2-user)). Write these values in the `MICROSOFT_CLIENT_ID` and `MICROSOFT_CLIENT_SECRET` environment variables.

Furthermore add the environment variable `HOME_URL` which is the base URL of your Kalle instance (e.g. `https://kalle.app`)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/rohansaw"><img src="https://avatars.githubusercontent.com/u/49531442?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rohan Sawahn</b></sub></a><br /><a href="https://github.com/kalle-app/kalle/commits?author=rohansaw" title="Code">💻</a> <a href="#ideas-rohansaw" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Lasklu"><img src="https://avatars.githubusercontent.com/u/49564344?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lasklu</b></sub></a><br /><a href="https://github.com/kalle-app/kalle/commits?author=Lasklu" title="Code">💻</a> <a href="#ideas-Lasklu" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/phlprcks"><img src="https://avatars.githubusercontent.com/u/33530575?v=4?s=100" width="100px;" alt=""/><br /><sub><b>phlprcks</b></sub></a><br /><a href="https://github.com/kalle-app/kalle/commits?author=phlprcks" title="Code">💻</a> <a href="#ideas-phlprcks" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/sspangenberg"><img src="https://avatars.githubusercontent.com/u/49531479?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sspangenberg</b></sub></a><br /><a href="https://github.com/kalle-app/kalle/commits?author=sspangenberg" title="Code">💻</a> <a href="#ideas-sspangenberg" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Skn0tt"><img src="https://avatars.githubusercontent.com/u/14912729?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Simon Knott</b></sub></a><br /><a href="https://github.com/kalle-app/kalle/commits?author=Skn0tt" title="Code">💻</a> <a href="#ideas-Skn0tt" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://nodescription.net"><img src="https://avatars.githubusercontent.com/u/305339?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Patrick Connolly</b></sub></a><br /><a href="#content-patcon" title="Content">🖋</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
