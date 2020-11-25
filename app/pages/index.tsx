import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import NavBar from "app/components/navbar"
import { PrimaryButton, SecondaryButton, TertiaryButton } from "app/components/buttons"

// const UserInfo = () => {
//   const currentUser = useCurrentUser()
//   const [logout] = useMutation(logoutMutation)

//   if (currentUser) {
//     return (
//       <>
//         <button
//           className="button small"
//           onClick={async () => {
//             await logout()
//           }}
//         >
//           Logout
//         </button>
//         <div>
//           User id: <code>{currentUser.id}</code>
//           <br />
//           User role: <code>{currentUser.role}</code>
//         </div>
//       </>
//     )
//   } else {
//     return (
//       <>
//         <Link href="/signup">
//           <a className="button small">
//             <strong>Sign Up</strong>
//           </a>
//         </Link>
//         <Link href="/login">
//           <a className="button small">
//             <strong>Login</strong>
//           </a>
//         </Link>
//       </>
//     )
//   }
// }

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <NavBar />
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
