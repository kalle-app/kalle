import React, { useState } from "react"
import { useRouter, BlitzPage, useMutation } from "blitz"
import loginMutation from "app/auth/mutations/login"
import Layout from "app/layouts/Layout"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { LoginInput, LoginInputType } from "../validations"

const initialCredentials = {
  email: "",
  password: "",
}

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  const [login] = useMutation(loginMutation)
  const [message, setMessage] = useState("")
  const [credentials, setCredentials] = useState(initialCredentials)

  const setValue = (field: string, value: any) => {
    setCredentials({
      ...credentials,
      [field]: value,
    })
  }

  function checkCredentials(): string {
    try {
      LoginInput.parse(credentials)
      return "valid"
    } catch (error) {
      return error["errors"][0]["message"]
    }
  }

  const processLogin = async () => {
    const check = checkCredentials()
    if (check === "valid") {
      try {
        await login({ email: credentials.email, password: credentials.password })
        router.push("/")
      } catch (error) {
        if (error.name === "AuthenticationError") {
          setMessage("Sorry, those credentials are invalid")
        } else {
          setMessage("Sorry, we had an unexpected error. Please try again.")
        }
      }
    } else {
      setMessage(check)
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mt-4 mb-5">Log In</h2>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={(e) => setValue("email", e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setValue("password", e.target.value)} />
          </Form.Group>
          <Form.Text className="text-danger mb-4">{message}</Form.Text>
        </Form>
        <Row>
          <Col>
            <Button variant="primary" onClick={processLogin}>
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
