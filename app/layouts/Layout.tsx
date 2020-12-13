import { ReactNode } from "react"
import { Head } from "blitz"
import NavBar from "app/components/Navbar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "kalle"}</title>
        <link rel="icon" href="logo.png" type="image/png" />
      </Head>
      <NavBar />
      <div className="container mx-auto mt-8">{children}</div>
    </>
  )
}

export default Layout
