import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import getMeetings from "app/meetings/queries/getMeetings"
import { BlitzPage, Link, useQuery, useSession } from "blitz"
import { Suspense } from "react"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Skeleton from "react-loading-skeleton"

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
      <hr
        style={{
          color: "#000000",
          backgroundColor: "#000000",
          height: 0.5,
          borderColor: "#DA471F",
        }}
      />
      <h5>Imprint</h5>
      <p>
        This Application is developed within the{" "}
        <Link href="https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/wise-20-21-3166-trends-und-konzepte-dynamischer-web_anwendungen.html">
          Trends and Concepts in Dynamic Web-Applications Seminar
        </Link>{" "}
        at the Hasso Plattner Institute. See the{" "}
        <Link href="https://hpi.de/impressum.html">imprint</Link>.
      </p>
    </main>
  )
}

const MeetingCarousel = ({ meetings }) => {
  return (
    <Carousel style={{ marginBottom: "5%", backgroundColor: "white" }}>
      {meetings.map((meeting) => {
        return (
          <Carousel.Item>
            <Card
              style={{ backgroundColor: "white", height: "200px" }}
              as="li"
              key={"card" + meeting.id}
            ></Card>
            <Carousel.Caption key={"caption" + meeting.id}>
              <h3 className="text-dark">{meeting.name}</h3>
              <p className="text-dark">
                {meeting.description.length > 100
                  ? meeting.description.substr(0, 99) + "..."
                  : meeting.description}
              </p>
              <Link href="/meetings">
                <Button variant="outline-primary" className="m-1" size="sm">
                  Details
                </Button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

const InfoSection = ({ title, description, link, buttonText }) => {
  return (
    <Col sm={4} className="mt-3">
      <h4>{title}</h4>
      <h6>{description}</h6>
      <Link href={link}>
        <Button variant="outline-secondary" className="m-2" size="lg">
          {buttonText}
        </Button>
      </Link>
    </Col>
  )
}

const PrivateContent = () => {
  const user = useCurrentUser()
  const [meetings] = useQuery(getMeetings, null)

  return (
    <main className="text">
      <Container>
        <Row>
          <Col sm={7}>
            <h2 className="p-4">Hey there {user?.name}!</h2>
            <h4 className="p-4">
              It's time to organize your meetings. I am Kalle and my mission is to help you doing
              this. Bubble that my friend!
            </h4>
          </Col>
          <Col sm={5} style={{ display: "flex" }}>
            <img alt="logo" src="/logo.png" width="80%" height="auto" className="align-self-end" />
          </Col>
        </Row>
      </Container>
      <div className="text-center">
        <h4 className="p-4">
          You have {meetings!.length > 0 ? meetings!.length : "no"} active meetings.
        </h4>
        {meetings!.length > 0 && <MeetingCarousel meetings={meetings} />}
        <h4 className="pb-3">Kalle is here to help you organizing a new meeting.</h4>
        <Link href="/meetings">
          <Button variant="primary" className="m-1" size="lg">
            Create Meeting
          </Button>
        </Link>
        <Container style={{ marginTop: "3%" }}>
          <Row>
            <InfoSection
              title="Connect a calendar"
              description="Kalle uses your calendars to show your invitees when you are available."
              link="/settings"
              buttonText="Connect Calendar"
            />
            <InfoSection
              title="Set a schedule"
              description="You can add schedules set general time windows where you are available. For example
              weekdays from 9:00 to 17:00."
              link="/settings"
              buttonText="Add Schedule"
            />
            <InfoSection
              title="Settings"
              description="Manage your Kalle Account."
              link="/settings"
              buttonText="Settings"
            />
          </Row>
        </Container>
      </div>
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
