import { Link } from "blitz"
import React from "react"
import { Container, Button } from "react-bootstrap"

const AuthError = () => {
  return (
    <Container className="text-center">
      <h3>You currently have no access to this Page :(</h3>
      <p>Please log in or create an account first</p>
      <Link href="/login">
        <Button>To Login</Button>
      </Link>
    </Container>
  )
}

export default AuthError
