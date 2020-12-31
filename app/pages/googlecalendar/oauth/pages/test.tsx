import { BlitzPage, invoke, useMutation } from "blitz"
import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import createConnection from "../queries/createConnection"
import googlequery from "../../mutations/googlequery"
import getCalendarCredentials from "../queries/getCalendarCredentials"


function TestFun() {
  const now = new Date()
  const future = new Date(2021, 2)
  const [query] = useMutation(googlequery)

  return (
    <>
      <button onClick={() => invoke(getCalendarCredentials, null)}>Click me</button>
      <button onClick={()=> invoke(createConnection, {})}>GDHAsWGD</button>
      <button onClick={async () => {
        try{
        await query({start: now, end: future})}
        catch (err) {
          console.log(err)
        }
      }
        }>TestCalendar</button>
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