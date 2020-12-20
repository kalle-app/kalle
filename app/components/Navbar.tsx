import React from "react"
import logoutMutation from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import { useRouter, useMutation } from "blitz"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import NavDropdown from "react-bootstrap/NavDropdown"

const Navigation = () => {
  return useCurrentUser() ? <PrivateNavigation /> : <PublicNavigation />
}

const PrivateNavigation = () => {
  const router = useRouter()
  const [logout] = useMutation(logoutMutation)
  const currentUser = useCurrentUser()
  return (
    <>
      <Nav className="mr-auto">
        <Nav.Link href="/meetings">Meetings</Nav.Link>
      </Nav>
      <Nav>
        <NavDropdown alignRight title={currentUser?.email} id="basic-nav-dropdown">
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
        <Nav.Link href="/login">Log In</Nav.Link>
      </Nav>
    </>
  )
}

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="logo"
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Kalle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Suspense fallback={<PublicNavigation />}>
            <Navigation />
          </Suspense>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
