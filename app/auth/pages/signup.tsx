import React, { useState } from "react"
import { useRouter, BlitzPage, useMutation, Link } from "blitz"
import signupMutation from "app/auth/mutations/signup"
import Layout from "app/layouts/Layout"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { SignupInput, checkPassword, checkUsername } from "app/auth/validations"
import { Alert } from "react-bootstrap"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const [signup] = useMutation(signupMutation)
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const processSignup = async () => {
    const parseResult = SignupInput.safeParse({
      name,
      email,
      password,
      username,
    })

    if (!parseResult.success) {
      setMessage(parseResult.error.errors[0].message)
      return
    }

    const usernameCheck = checkUsername(username)
    const passwordCheck = checkPassword(password)

    if (!usernameCheck) {
      setMessage("Your username can only contain alphanumeric characters and underscores")
      return
    }
    if (!passwordCheck.valid) {
      setMessage(passwordCheck.message)
      return
    }
    try {
      await signup({
        name,
        email,
        password,
        username,
      })
      router.push("/")
    } catch (error) {
      const message = {
        emailAlreadyUsed: "This email is already being used",
        usernameAlreadyUsed: "This username is already being used",
      }[error.message]

      setMessage(message ?? "Sorry, we had an unexpected error. Please try again.")
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mt-4 mb-5">Sign Up</h2>
        <Alert variant="danger">
          Please notice that his application is for demonstration purposes alone. Do not use it at
          this moment.
        </Alert>
        <Form>
          <Form.Group controlId="fullName">
            <Form.Label>Full name</Form.Label>
            <Form.Control autoComplete="name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              autoComplete="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              autoComplete="new-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Text className="text-danger mb-4">{message}</Form.Text>
        </Form>
        <Row>
          <Col xs={8}>
            Already registered?{" "}
            <Link href="/login">
              <a className="text-nowrap">Sign in</a>
            </Link>{" "}
            now!
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button id="signup" variant="primary" onClick={processSignup}>
              Sign up
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
