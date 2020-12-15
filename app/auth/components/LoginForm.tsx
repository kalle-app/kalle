import React from "react"
import { Link, useMutation } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import loginMutation from "app/auth/mutations/login"
import { LoginInput, LoginInputType } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [login] = useMutation(loginMutation)
  return (
    <div>
      <h1 className="text-2xl text-center mb-6">Login</h1>

      <Form<LoginInputType>
        submitText="Log In"
        schema={LoginInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await login({ email: values.email, password: values.password })
            props.onSuccess?.()
            return undefined
          } catch (error) {
            if (error.name === "AuthenticationError") {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>

      <div style={{ marginTop: "2rem" }}>
        Or <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginForm
