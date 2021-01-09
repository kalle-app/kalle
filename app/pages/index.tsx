import { useCurrentUser } from "app/hooks/useCurrentUser"
import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import Button from "react-bootstrap/Button"
import { Suspense } from "react"

const Content = () => {
  return useCurrentUser() ? <PrivateContent /> : <PublicContent />
}

const PublicContent = () => {
  return (
    <main className="text-center">
      <h2 className="p-4">Haven't used Kalle to manage your Meetings?</h2>
      <Button href="/signup" variant="primary" className="m-1" size="lg">
        Sign up
      </Button>
    </main>
  )
}

const PrivateContent = () => {
  return (
    <main className="text-center">
      <h2 className="p-4">Welcome to Kalle!</h2>
      <Button href="/settings" variant="primary" className="m-1" size="lg">
        Connect a Calendar!
      </Button>
    </main>
  )
}

const Home: BlitzPage = () => {
  return (
    <Suspense fallback={<PublicContent />}>
      <Content />
    </Suspense>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home