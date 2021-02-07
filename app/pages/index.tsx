import { useCurrentUser } from "app/hooks/useCurrentUser"
import HomeLayout from "app/layouts/HomeLayout"
import getMeetings from "app/meetings/queries/getMeetings"
import { BlitzPage, Link, useQuery, useSession } from "blitz"
import { format } from "date-fns"
import { Meeting } from "db"
import React, { Suspense } from "react"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Skeleton from "react-loading-skeleton"
import { CopyToClipboard } from "react-copy-to-clipboard"

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
            <h4 className="p-4">
              Kalle helps you scheduling meetings with friends, colleagues and customers!
            </h4>
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
                <h6>You can connect your Google-, MS-Outlook-, and even CalDAV Calendars!</h6>
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
              Your partner will pick an appointment from your available slots and you will get
              notified!
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
            <h2 className="text-center">Time-management</h2>
            <br></br>
            <h5 className="text-center">
              With Kalle you will no longer have extensive chats to schedule a meeting, and instead
              have more free time!
            </h5>
          </Col>
          <Col>
            <h2 className="text-center">Customizable</h2>
            <br></br>
            <h5 className="text-center">
              Feel that there are features missing? Make sure to check out the advances options. As
              we are Open source, you can even create new functionalities
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
            <h2 className="text-center">Connectivity</h2>
            <br></br>
            <h5 className="text-center">
              You can connect many different calendars: CalDAV, Google Calendar, Oulook..
            </h5>
          </Col>
          <Col>
            <h2 className="text-center">Busy?</h2>
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

const IntroSection = ({ user }) => {
  return (
    <section style={{ backgroundColor: "#ffebe3" }}>
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
            <img alt="logo" src="/logo.png" width="60%" height="auto" className="align-self-end" />
          </Col>
        </Row>
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
    </section>
  )
}

const OverviewBox = (props: { span; header; children }) => {
  return (
    <Col sm={props.span} className="p-3">
      <Col sm={12} className="p-3 rounded border border-secondary">
        <div>
          <div>
            {props.header}
            <hr></hr>
          </div>
          <div style={{ minHeight: "300px", maxHeight: "60vh", overflowY: "scroll" }}>
            {props.children}
          </div>
        </div>
      </Col>
    </Col>
  )
}

const OverviewSection = ({ meetings, appointments }) => {
  return (
    <section style={{ minHeight: "70vh" }}>
      <Container className="pt-2">
        <Row>
          <OverviewBox
            span={7}
            header={
              <Row>
                <Col sm={8}>
                  <h4>Active meetings ({meetings!.length})</h4>
                </Col>
                <Col sm={4}>
                  <Link href="/meeting/create">
                    <Button variant="primary" className="m-1 float-md-right">
                      + Meeting
                    </Button>
                  </Link>
                </Col>
              </Row>
            }
          >
            {meetings!.length == 0 ? <p className="text-center">No active meetings yet</p> : ""}
            {meetings?.map((meeting: Meeting) => {
              return (
                <>
                  <Row className="mx-2 my-2 border border-secondary rounded">
                    <Col md={10} className="py-2 px-3">
                      <b>{meeting.name}</b> ({meeting.duration}min) <br></br>
                      Active until: {format(meeting.endDate, "dd.MM.yyyy")}
                    </Col>
                    <CopyToClipboard text={meeting.link}>
                      <Col
                        md={2}
                        className="text-center justify-content-center border-left border-secondary hoverPrimary"
                      >
                        Copy Link
                      </Col>
                    </CopyToClipboard>
                  </Row>
                </>
              )
            })}
          </OverviewBox>
          <OverviewBox span={5} header={<h4>Upcoming appointments</h4>}>
            {appointments.length === 0 ? (
              <p className="text-center">No upcoming appointments</p>
            ) : (
              ""
            )}
          </OverviewBox>
        </Row>
      </Container>
    </section>
  )
}

const PrivateContent = () => {
  const user = useCurrentUser()
  const [meetings] = useQuery(getMeetings, null)

  return (
    <main className="text">
      <IntroSection user={user} />
      <OverviewSection meetings={meetings} appointments={[]} />
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

Home.getLayout = (page) => <HomeLayout title="Dashboard | Kalle">{page}</HomeLayout>

export default Home
