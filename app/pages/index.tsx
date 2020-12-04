import { BlitzPage, Link } from "blitz"
import Layout from "app/layouts/Layout"
import { PrimaryButton, SecondaryButton, TertiaryButton } from "app/components/buttons"

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <h1>Kalle.app</h1>
      <p>Ich bin Kalle, dein fischiger Freund, und helfe dir Termine zu plätschern.</p>
      <Link href="/auth/login">
        <PrimaryButton>Log in</PrimaryButton>
      </Link>

      <p>Not registered yet?</p>

      <Link href="/signup">
        <SecondaryButton>Sign up</SecondaryButton>
      </Link>
      <p>Or just bubble a bit...</p>
      <TertiaryButton>Bubble!</TertiaryButton>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
