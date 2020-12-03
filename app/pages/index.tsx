import { Link, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <h1>Kalle.app</h1>
      <p>Ich bin Kalle, dein fischiger Freund, und helfe dir Termine zu plätschern.</p>

      <Link href="/auth/login">
        <a>Login</a>
      </Link>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
