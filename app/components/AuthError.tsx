import { Link } from "blitz"
import React from "react"
import { Container, Button } from "react-bootstrap"

const AuthError = () => {
  return (
    <Container className="text-center">
      <h3>Authentication not successfull</h3>
      <p>Please log in or create an account first</p>
      <Link href="/login">
        <Button>To Login</Button>
      </Link>
    </Container>
  )
}

export default AuthError
