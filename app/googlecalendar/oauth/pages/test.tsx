import { BlitzPage, invoke, useMutation, useQuery } from "blitz"
import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import createConnection from "../queries/createConnection"
import googlequery from "../../mutations/googlequery"
import getCalendarCredentials from "../queries/getCalendarCredentials"
import { Button, Row, Col, Form } from "react-bootstrap"

function TestFun() {
  const now = new Date()
  const future = new Date(2021, 2)
  const [query] = useMutation(googlequery)
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
            await query({ start: now, end: future })
          } catch (err) {
            console.log(err)
          }
        }}
      >
        googlequery
      </button>
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
