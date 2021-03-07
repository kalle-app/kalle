<p align="center"><img width="300" height="300" src="public/logo.png" alt="Logo"></p>

<h1 align="center" style=font-size:200px>Kalle - The CalDav Scheduling Tool</h1>

## Overview

Kalle is an **appointment scheduling tool** that allows you to schedule an appointment with customers, colleagues or friends within seconds. We support self-hosted CalDav-based calendars and solutions such as authenticating your Google calendar.

Kalle is a modern web app that is built with [Blitz.js](https://github.com/blitz-js/blitz), a full-stack React framework, made to boost productivity.
A hosted version can be found at [**kalle.app**](https://www.kalle.app/).

_This Project is part of the "Trends und Konzepte dynamischer Web-Anwendungen" Project Seminar 2020/21 at the Hasso-Plattner-Institute._

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
      <td>🔓</td>
      <td>Create an account</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Connect CalDav calendars</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Connect Google calendars</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Connect Outlook calendars</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Create a meeting</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Book an appointment</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Cancel an appointment</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Use schedule presets</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Use multiple calendars</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Hide conflicting events for invitees</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Email confirmations and reminders</td>
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
GOOGLE_CLIENT_ID="For oAuth to use google calendars"
GOOGLE_CLIENT_SECRET="For oAuth to use google calendars"
MICROSOFT_CLIENT_SECRET="For oAuth to use outlook calendars"
MICROSOFT_CLIENT_ID="For oAuth to use outlook calendars"
```

When mode !== development mails will be sent!

### Running the Application

Running `npm run dev` will start up a server which can be reached over the specified URL :)
It will also start up the PostgreSQL database, a Baikal server containing a calendar for experimental purposes, a Nextcloud server, the Quirrel job queue and Mailhog.

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
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!