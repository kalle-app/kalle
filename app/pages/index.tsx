import { useCurrentUser } from "app/hooks/useCurrentUser"
import { useSession, BlitzPage, Link } from "blitz"
import Layout from "app/layouts/Layout"
import Button from "react-bootstrap/Button"
import { Suspense } from "react"
import Skeleton from "react-loading-skeleton"
import { Card, Row, Col, Modal, Form, Container } from "react-bootstrap"

const Content = () => {
  const session = useSession()
  if (!session.isLoading) {
    return session.userId ? <PrivateContent /> : <PublicContent />
  }
  return <Skeleton count={10} />
}

const PublicContent = () => {
  return (
    <main className="text">
      <Container>
        <Row>
          <Col sm={5}>
            <h2 className="p-4">Haven't used Kalle to manage your Meetings?</h2>
            <h4 className="p-4">Kalle helps you finding the best meeting slot with your partner</h4>
            <div className="p-4">
              <Link href="/signup">
                <Button variant="primary" className="m-1" size="lg" block>
                  Sign up now
                </Button>
              </Link>
            </div>
          </Col>
          <Col sm={7}>
            <img
              alt="meeting"
              src="/meeting.jpg"
              width="100%"
              height="100%"
              className="d-inline-block align-top"
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col sm={4}>
            <Row>
              <Col sm={12}>
                <h4>1. Connect a calendar</h4>
                <h6>You can connect any calendar type, even CalDAV!</h6>
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <h4>2. Create a meeting link</h4>
            <h6>With this link you can invite all your colleagues!</h6>
          </Col>
          <Col sm={4}>
            <h4>3. Share it & meet!</h4>
            <h6>
              Your partner will select an appointment in your calendar and you will get notified!
            </h6>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

const PrivateContent = () => {
  return (
    <main className="text-center">
      <h2 className="p-4">Welcome to Kalle!</h2>
      <Link href="/settings">
        <Button variant="primary" className="m-1" size="lg">
          Connect a Calendar!
        </Button>
      </Link>
    </main>
  )
}

const Home: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <Content />
    </Suspense>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
