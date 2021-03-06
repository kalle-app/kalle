<p align="center"><img width="300" height="300" src="public/logo.png" alt="Logo"></p>

<h1 align="center" style=font-size:200px>Kalle - The CalDav Scheduling Tool</h1>

## Overview

Kalle is an **appointment scheduling tool** that allows you to schedule an appointment with customers, colleagues or friends within seconds. We support self-hosted CalDav-based calendars and solutions such as authenticating your Google calendar.

Kalle is a modern web app that is built with [Blitz.js](https://github.com/blitz-js/blitz), a full-stack React framework, made to boost productivity.
A hosted version can be found at [**kalle.app**](https://www.kalle.app/)

_This Project is part of the "Trends und Konzepte dynamischer Web-Anwendungen" Project Seminar 2020/21 at the Hasso-Plattner-Institute_

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
```

When mode !== development mails will be sent!

### Running the Application

Running `npm run dev` will start up a server which can be reached over the specified URL :)
It will also start up the PostgreSQL database, a Baikal server containing a calendar for experimental purposes, a Nextcloud server, the Quirrel job queue and Mailhog.
