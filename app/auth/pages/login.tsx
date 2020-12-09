import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import Card from "app/components/Card"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="container flex flex-col items-center">
      <Card>
        <LoginForm onSuccess={() => router.push("/")} />
      </Card>
    </div>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
