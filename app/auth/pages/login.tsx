import React, { useState } from "react"
import { useRouter, BlitzPage, useMutation } from "blitz"
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
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
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
          <Col>
            <Button id="login" variant="primary" onClick={processLogin}>
              Log In
            </Button>
          </Col>
          <Col className="my-auto">
            <p className="my-auto d-flex justify-content-end">or</p>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-primary" href="/signup">
              Sign Up
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
