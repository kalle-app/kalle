import Layout from "app/layouts/Layout"
import { BlitzPage, invoke, useQuery } from "blitz"
import React, { Suspense } from "react"
import { Button } from "react-bootstrap"
import getURL from "../queries/getOAuthToken"
function TestFun() {
  const [url] = useQuery(getURL, undefined)
  return (
    <>
      <Button variant="primary" href={url}>
        createConnection
      </Button>
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