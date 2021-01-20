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
                <Button variant="outline-primary" className="m-1" size="lg" block>
                  Sign up now
                </Button>
              </Link>
            </div>
          </Col>
          <Col sm={7}>
            <img
              alt="meeting"
              src="/meeting_4.svg"
              width="95%"
              height="95%"
              className="d-inline-block align-top"
            />
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col sm={4}>
            <Row>
              <Col lg={12}>
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
        <br />
        <br />
        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 0.5,
            borderColor: "#DA471F",
          }}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt="meeting"
              src="/clock.svg"
              width="auto"
              height="100px"
              className="img-responsive d-inline-block align-top"
            />
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt="meeting"
              src="/secure.svg"
              width="auto"
              height="100px"
              className="d-inline-block align-top"
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <h2 className="text-center">time-management</h2>
            <br></br>
            <h5 className="text-center">
              With Kalle you will no longer have extensive meeting chats, but more effective time!
            </h5>
          </Col>
          <Col>
            <h2 className="text-center">secure first</h2>
            <br></br>
            <h5 className="text-center">
              Kalle takes care of the GDPR. It is open-source, so you can check everything you want
              to!
            </h5>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt="meeting"
              src="/connect.svg"
              width="auto"
              height="100px"
              className="img-responsive d-inline-block align-top"
            />
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt="meeting"
              src="/busy.svg"
              width="auto"
              height="100px"
              className="d-inline-block align-top"
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <h2 className="text-center">connectivity</h2>
            <br></br>
            <h5 className="text-center">
              You can connect many different calendars: CalDAV, Google Calendar, Oulook..
            </h5>
          </Col>
          <Col>
            <h2 className="text-center">busy?</h2>
            <br></br>
            <h5 className="text-center">
              Kalle automatically recognises when you are busy and will only show you free
              timeslots!
            </h5>
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
