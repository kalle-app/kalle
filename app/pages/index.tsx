import { BlitzPage, Link } from "blitz"
import Layout from "app/layouts/Layout"
import { PrimaryLink } from "app/components/Links"

const Home: BlitzPage = () => {
  return (
    <div className="container flex flex-col items-center">
      <h1 className="flex-grow-0 mt-20 mb-10 text-4xl font-serif">
        Haven't used Kalle to manage your Meetings?
      </h1>
      <Link href="/signup">
        <PrimaryLink className="flex-grow-0 text-2xl">Sign up</PrimaryLink>
      </Link>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
