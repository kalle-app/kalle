import { ReactNode } from "react"
import { Head } from "blitz"
import NavBar from "app/components/navbar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "kalle"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      {children}
    </>
  )
}

export default Layout
