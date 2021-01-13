<p align="center"><img width="300" height="300" src="public/logo.png" alt="Logo"></p>

<h1 align="center" style=font-size:200px>Kalle - The CalDav Scheduling Tool</h1>

## Overview

Kalle is a **Appointment scheduling tool** that allows you to schedule an appointment with customers, collegues or friends within seconds. We support self hosted CalDav based calendars and solutions such as authenticating your google-calendar.

Kalle is a modern webapp that is built with [Blitz.js](https://github.com/blitz-js/blitz) a fullstack react framework, made to boost productivity.
A hosted version can be found at [**Kalle.app**](https://www.kalle.app/)

_This Project is part of the "Trends und Konzepte dynamischer Web-Anwendungen" Project Seminar 2020/21 at the Hasso-Plattner Institute_

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
      <td>Create an Account</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Connect CalDav calendars</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Connect google-calendars</td>
    </tr>
    <tr>
      <td>🔓</td>
      <td>Create a Meeting</td>
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

Make sure you have [Docker](https://docs.docker.com/get-docker/) installed on your system and have got the appropiate rights set. Then run the following command:

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
```

When mode !== development mails will be sent!

### Running the Application

Running `npm run start` will startup a server which can be reached over the specified url :)
