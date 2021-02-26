import React, { useState } from "react"
import { useRouter, BlitzPage, useMutation, Link } from "blitz"
import loginMutation from "app/auth/mutations/login"
import Layout from "app/layouts/Layout"
import { Button, Row, Col, Form } from "react-bootstrap"
import { LoginInput } from "../validations"

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  const [login] = useMutation(loginMutation)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const processLogin = async () => {
    const parseResult = LoginInput.safeParse({
      email,
      password,
    })

    if (!parseResult.success) {
      setMessage(parseResult.error.errors[0].message)
      return
    }

    try {
      await login({ email, password })
      router.push("/")
    } catch (error) {
      if (error.name === "AuthenticationError") {
        setMessage("Sorry, those credentials are invalid")
      } else {
        setMessage("Sorry, we had an unexpected error. Please try again.")
      }
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mt-4 mb-5">Log In</h2>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Text className="text-danger mb-4">{message}</Form.Text>
        </Form>
        <Row>
          <Col xs={8}>
            Not registered yet?{" "}
            <Link href="/signup">
              <a className="text-nowrap">Sign up</a>
            </Link>{" "}
            now!
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button id="login" variant="success" onClick={processLogin}>
              Log In
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
