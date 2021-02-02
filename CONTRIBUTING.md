# Contributing to Kalle

This document aims to ease new contributors into working on Kalle.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=3 orderedList=false} -->

<!-- code_chunk_output -->

- [Introduction to the Codebase](#introduction-to-the-codebase)
  - [Term Definitions](#term-definitions)
  - [Starting a Development Environment](#starting-a-development-environment)
  - [Database Structure](#database-structure)
  - [Folder Structure](#folder-structure)
- [Some Code Guidelines](#some-code-guidelines)

<!-- /code_chunk_output -->

## Introduction to the Codebase

This introduction assumes that you've used Kalle and are familiar with the problem it solves.

### Term Definitions

To prevent misunderstanding, we agree on using the following terms to describe our problem domain:

| Term                   | Description                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Appointment Suggestion | Created by the _Invitee_, by opening the scheduling link and selecting one of the available timeslots.                                                                                                             |
| Appointment            | An _Appointment Suggestion_ that was accepted by the _Calendar Owner_.                                                                                                                                             |
| Calendar Owner         | Registered user that uses Kalle to invite people (aka to use Kalle to send a link to get _Appointment Suggestions_ from _Invitees_)                                                                                |
| Connected Calendar     | An external calendar, connected via CalDav / GCal / O365 / ...                                                                                                                                                     |
| External Event         | An interval in the _Unified Calendar_, during which the calendar owner isn't available for appointment booking.                                                                                                    |
| Meeting                | Created by a _Calendar Owner_ when they want to schedule an appointment with someone. Can be understood as "the desire to speak about some topic". Kalle is used to help to find an _Appointment_ for a _Meeting_. |
| Integrated Calendar    | The Kalle-hosted calendar used for blocking slots                                                                                                                                                                  |
| Invitee                | Invited by the _Calendar Owner_ to schedule an appointment with them.                                                                                                                                              |
| Target Calendar        | The _Connected Calendars_ where _Appointments_ are inserted.                                                                                                                                                       |
| Time Slot              | An time period (its duration, e.g. 30 min. is defined by the calendar owner) in which the calendar owner is available and that can be picked from an _invitee_ to create as _appointment suggestion_.              |
| Unified Calendar       | The combination of all _Connected Calendars_ and the _Integrated Calendar_.                                                                                                                                        |

#### Example of finding an Appointment

Alice wants to meet with Bob to talk about Goldfishes. For this purpose, she creates a _Meeting_ in Kalle with the topic "Goldfish Update". She sends Bob the link to this _meeting_ (kalle.app/alice/goldfish-updates).

Bob opens the link and gets a lot of _time slots_ displayed in wich Alice is available. He chooses one of them. With this he creates an _Appointment Suggestion_.

Alice receives an e-mail: "Bob has chosen an appointment". She clicks on "Confirm". This turns the _Appointment Suggestion_ into an _Appointment_ for the _meeting_ called "Goldfish Update".

### Starting a Development Environment

Requirements:

- [ ] Docker, Docker-Compose
- [ ] Node.js

`npm install` to fetch dependencies.
`npm start` to start the dev environment.
<kbd>CTRL+C</kbd> to stop.
`docker-compose down` to tear it down.

`npm run db:seed` seeds the database (optional, but recommended).

`npm test` executes unit & integration tests. The first run can take a while, it'll fetch some Docker images in the background.

`npm cypress:open` starts Cypress (e2e tests).

### Database Structure

We use [Prisma](https://prisma.io) as our database client.
Familiarise yourself with Kalle's database schema by reading [`db/schema.prisma`](./db/schema.prisma).
You can use [Prisma-ERD](https://prisma-erd.simonknott.de) to visualize it.

### Folder Structure

Kalle's core can be found in [`app/`](./app).
A good way of getting to grips with the codebase is to start at the `pages/`-folders, and work your way from there.

[`db/`](./db) contains the database schema, migrations and a seed script.

[`test/`](./test) contains all kinds of utilities needed for our integration tests.

[`cypress/`](./cypress) contains end-to-end tests.

[`email/`](./email) contains email templates.

## Some Code Guidelines

- We follow the [Github Flow](https://guides.github.com/introduction/flow/).
- Make sure to name your branches semantically succinct. We like to use the prefixes `feature/`, `fix/` and `chore/`.
