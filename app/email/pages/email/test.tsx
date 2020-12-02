import { BlitzPage, invoke } from "blitz"
import Layout from "app/layouts/Layout"
import { Suspense } from "react"
import sendConfirmationMail from "../../../components/createEmail/queries/sendConfirmationMail"

/*
 * This is a development file. It is meant for testing the email server and can be deleted later on
 */

const Test: BlitzPage = () => {
  return (
    <div className="container">
      <h1>Kalle.app</h1>
      <p>Das ist deine Email-Testseite</p>
      <button
        onClick={() => {
          const appointment = {
            start: {
              year: 2020,
              month: 11,
              day: 26,
              hour: 12,
              minute: 20,
            },
            duration: {
              hours: 0,
              minutes: 30,
            },
            title: "Kalle",
            description: "TEST",
            method: "request",
            location: "Berlin",
            url: "www.kalle.app",
            organiser: {
              name: "Rohan Sawahn",
              email: "lukas.laskowski@student.hpi.de",
            },
            owner: {
              name: "Lukas Laskowski",
              email: "lasklu@gmail.com",
            },
          }
          invoke(sendConfirmationMail, { appointment: appointment })
        }}
      >
        Email versenden
      </button>
    </div>
  )
}

Test.getLayout = (page) => <Layout title="Test">{page}</Layout>
const Site: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Test />
    </Suspense>
  )
}

export default Site
