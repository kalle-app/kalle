import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { PrimaryButton, SecondaryButton, TertiaryButton } from "app/components/buttons"

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <h1>Kalle.app</h1>
      <p>Ich bin Kalle, dein fischiger Freund, und helfe dir Termine zu plätschern.</p>
      <PrimaryButton label="Log in" href="/auth/login" />
      <p>Not registered yet?</p>
      <SecondaryButton label="Sign up" href="/signup" />
      <p>Or just bubble a bit...</p>
      <TertiaryButton label="Bubble!" />
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
