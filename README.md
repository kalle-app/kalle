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
      <td>Create a meeting</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Book an appointment</td>
    </tr>
  </tbody>
</table>

## Getting started

### Setup

Follow these steps for a development environment:

Make sure you have installed [Docker](https://docs.docker.com/get-docker/) on your system and set the appropriate permissions. Then run the following command:

```
npm install
```

Now you have to create a `.env.local` file in your root folder.

This should contain the following properties:

```
DATABASE_URL="file:./db.sqlite"
EMAIL_FROM="changeme@yourdomain.com"
SMTP_USER="Insert SMTP Username"
SMTP_PASSWORD="Insert SMTP Password"
SMTP_PORT="Insert PORT to connect to the SMTP-Server, usually 587"
SMTP_HOST="Insert HOST_Name of SMTP-Server"
MODE="DEVELOPMENT"
HOME_URL="URL where kalle is deployed from: http://localhost:3000"
GOOGLE_CLIENT_ID="For oAuth to use google calendars"
GOOGLE_CLIENT_SECRET="For oAuth to use google calendars"
MICROSOFTCLIENTSECRET="For oAuth to use outlook calendars"
MICROSOFTCLIENTID="For oAuth to use outlook calendars"
```

When mode !== development mails will be sent!

### Running the application

Running `npm run dev` will start up a server which can be reached over the specified URL :)
