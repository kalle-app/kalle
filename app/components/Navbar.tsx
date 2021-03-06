import React from "react"
import logoutMutation from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import { useRouter, useMutation, useSession, Link } from "blitz"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"

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
          <NavDropdown.Item href="/calendars">Calendars</NavDropdown.Item>
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
      <Nav className="mr-auto" />
      <Nav>
        <Link href="/login" passHref>
          <Nav.Link>Log In</Nav.Link>
        </Link>
      </Nav>
    </>
  )
}

const Navigation = () => {
  const session = useSession()
  if (!session.isLoading) {
    return session.userId ? <PrivateNavigation /> : <PublicNavigation />
  }
  return null
}

const NavBar = () => {
  return (
    <Navbar style={{ boxShadow: "0px 2px 4px rgba(218, 71, 31, 0.3)" }} bg="white" expand="lg">
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
            kalle.app
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
