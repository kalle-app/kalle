import React from "react"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

const Navigation = () => {
  return useCurrentUser() ? <PrivateNavigation /> : <PublicNavigation />
}

const PrivateNavigation = () => {
  const currentUser = useCurrentUser()
  return (
    <>
      <Nav className="mr-auto">
        <Nav.Link href="/meetings/all">Meetings</Nav.Link>
        <Nav.Link href="/calendars">Calendars</Nav.Link>
      </Nav>
      <Button href="/users/settings" variant="outline-primary"> {currentUser?.email} </Button>
    </>
  )
}

const PublicNavigation = () => {
  return (
    <>
      <Nav className="mr-auto"></Nav>
      <Button variant="outline-primary">Login</Button>
    </>
  )
}

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src="/logo.png" width="30" height="30"className="d-inline-block align-top"/>{' '}
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
