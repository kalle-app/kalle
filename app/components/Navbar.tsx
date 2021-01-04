import React from "react"
import logoutMutation from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import { useRouter, useMutation, useSession, Link } from "blitz"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"

const Navigation = () => {
  const session = useSession()
  if (!session.isLoading) {
    return session.userId ? <PrivateNavigation /> : <PublicNavigation />
  }
  return <div></div>
}

const PrivateNavigation = () => {
  const router = useRouter()
  const [logout] = useMutation(logoutMutation)
  const currentUser = useCurrentUser()
  return (
    <>
      <Nav className="mr-auto">
        <Link href="/meetings" passHref>
          <Nav.Link>Meetings</Nav.Link>
        </Link>
      </Nav>
      <Nav>
        <NavDropdown alignRight title={currentUser?.email ?? "Loading ..."} id="auth-dropdown">
          <NavDropdown.Item href="/schedules">Schedules</NavDropdown.Item>
          <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={async () => {
              await logout()
              router.push("/")
            }}
          >
            Sign out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  )
}

const PublicNavigation = () => {
  return (
    <>
      <Nav className="mr-auto"></Nav>
      <Nav>
        <Link href="/login" passHref>
          <Nav.Link>Log In</Nav.Link>
        </Link>
      </Nav>
    </>
  )
}

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            <img
              alt="logo"
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Kalle
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Suspense fallback={<div></div>}>
            <Navigation />
          </Suspense>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
