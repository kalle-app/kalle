import { useCurrentUser } from "app/hooks/useCurrentUser"
import { useSession, BlitzPage, Link } from "blitz"
import Layout from "app/layouts/Layout"
import Button from "react-bootstrap/Button"
import { Suspense } from "react"

const Content = () => {
  return useSession() ? <PrivateContent /> : <PublicContent />
}

const PublicContent = () => {
  return (
    <main className="text-center">
      <h2 className="p-4">Haven't used Kalle to manage your Meetings?</h2>
      <Link href="/signup">
        <Button variant="primary" className="m-1" size="lg">
          Sign up
        </Button>
      </Link>
    </main>
  )
}

const PrivateContent = () => {
  return (
    <main className="text-center">
      <h2 className="p-4">Welcome to Kalle!</h2>
      <Link href="/settings">
        <Button variant="primary" className="m-1" size="lg">
          Connect a Calendar!
        </Button>
      </Link>
    </main>
  )
}

const Home: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Content />
    </Suspense>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
