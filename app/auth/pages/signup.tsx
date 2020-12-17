import React, { useState } from "react"
import { useRouter, BlitzPage, useMutation } from "blitz"
import signupMutation from "app/auth/mutations/signup"
import Layout from "app/layouts/Layout"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { SignupInput, SignupInputType } from "app/auth/validations"
import * as z from "zod"

const initialCredentials = {
  name: "",
  email: "",
  password: "",
}

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const [signup] = useMutation(signupMutation)
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
      SignupInput.parse(credentials)
      return "valid"
    } catch (error) {
      return error["errors"][0]["message"]
    }
  }

  const processSignup = async () => {
    const check = checkCredentials()
    if (check === "valid") {
      try {
        await signup({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        })
        router.push("/")
      } catch (error) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
          setMessage("This email is already being used")
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
        <h2 className="text-center mt-4 mb-5">Sign Up</h2>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Full name</Form.Label>
            <Form.Control onChange={(e) => setValue("name", e.target.value)} />
          </Form.Group>
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
            <Button variant="primary" onClick={processSignup}>
              Sign Up
            </Button>
          </Col>
          <Col className="my-auto">
            <p className="my-auto d-flex justify-content-end">or</p>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-primary" href="/login">
              Log In
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
