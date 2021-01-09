import { BlitzPage, invoke, useQuery } from "blitz"
import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import createConnection from "../queries/createConnection"
import googlequery from "../../helpers/googlequery"
import getCalendarCredentials from "../queries/getCalendarCredentials"
import { Button, Row, Col, Form } from "react-bootstrap"
import getFreeBusySchedule from "../../queries/getFreeBusySchedule"
import createCalendarEvent from "../../queries/createCalendarEvent"

function TestFun() {
  const now = new Date()
  const future = new Date(2021, 2)
  const [url] = useQuery(createConnection, undefined)
  return (
    <>
      <Button variant="primary" href={url}>
        createConnection
      </Button>
      <button onClick={() => invoke(getCalendarCredentials, null)}>getCalendarCredentials</button>
      <button
        onClick={async () => {
          try {
            //await invoke(googlequery,{ start: now, end: future })
          } catch (err) {
            console.log(err)
          }
        }}
      >

        sgooglequery
      </button>
      <Button onClick= {() => invoke(getFreeBusySchedule, { start: now, end: future })}>dGet Free Busy </Button>
      <Button onClick= {() => invoke(createCalendarEvent, null)}>post event  </Button>
    </>
  )
}

const Test: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading ...">
        <TestFun />
      </Suspense>
    </div>
  )
}

Test.getLayout = (page) => <Layout title="Test">{page}</Layout>

export default Test