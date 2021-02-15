import { useCurrentUser } from "app/hooks/useCurrentUser"
import HomeLayout from "app/layouts/HomeLayout"
import getMeetings from "app/meetings/queries/getMeetings"
import getUpcomingBookings from "app/meetings/queries/getUpcomingBookings"
import { BlitzPage, Link, useQuery, useSession } from "blitz"
import { format } from "date-fns"
import { Booking, Meeting } from "db"
import React, { Suspense } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Skeleton from "react-loading-skeleton"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { getOrigin } from "utils/generalUtils"
import ReactTooltip from "react-tooltip"

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
      <Container className="mt-5">
        <Row>
          <Col md={5}>
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
          <Col md={7} className="p-4">
            <img
              alt="meeting"
              src="/meeting_4.svg"
              width="95%"
              height="95%"
              className="d-inline-block align-top"
            />
          </Col>
        </Row>
        <Row className="pb-4">
          <Col sm={4}>
            <div className="p-2">
              <h4>1. Connect a calendar</h4>
              <h6>You can connect your Google-, MS-Outlook-, and even CalDAV Calendars!</h6>
            </div>
          </Col>
          <Col sm={4}>
            <div className="p-2">
              <h4>2. Create a meeting link</h4>
              <h6>With this link you can invite all your colleagues!</h6>
            </div>
          </Col>
          <Col sm={4}>
            <div className="p-2">
              <h4>3. Share it and meet!</h4>
              <h6>
                Your partner will pick an appointment from your available slots and you will get
                notified!
              </h6>
            </div>
          </Col>
        </Row>
        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 0.5,
            borderColor: "#DA471F",
          }}
        />
        <Row className="py-4">
          <Col
            sm={6}
            style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
          >
            <img
              alt="meeting"
              src="/clock.svg"
              width="auto"
              height="100px"
              className="d-inline-block align-top m-2"
            />
            <h2 className="text-center m-3">Time-management</h2>
            <h5 className="text-center m-3">
              With Kalle you will no longer have extensive chats to schedule a meeting, and instead
              have more free time!
            </h5>
          </Col>
          <Col
            sm={6}
            style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
          >
            <img
              alt="meeting"
              src="/secure.svg"
              width="auto"
              height="100px"
              className="d-inline-block align-top m-2"
            />
            <h2 className="text-center m-3">Customizable</h2>
            <h5 className="text-center m-3">
              Feel that there are features missing? Make sure to check out the advances options. As
              we are Open source, you can even create new functionalities
            </h5>
          </Col>
        </Row>
        <Row className="pb-4">
          <Col
            sm={6}
            style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
          >
            <img
              alt="meeting"
              src="/connect.svg"
              width="auto"
              height="100px"
              className="d-inline-block align-top m-2"
            />
            <h2 className="text-center m-3">Connectivity</h2>
            <h5 className="text-center m-3">
              You can connect many different calendars: CalDAV, Google Calendar, Oulook..
            </h5>
          </Col>
          <Col
            sm={6}
            style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
          >
            <img
              alt="meeting"
              src="/busy.svg"
              width="auto"
              height="100px"
              className="d-inline-block align-top m-2"
            />
            <h2 className="text-center m-3">Busy?</h2>
            <h5 className="text-center m-3">
              Kalle automatically recognises when you are busy and will only show you free
              timeslots!
            </h5>
          </Col>
        </Row>
        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 0.5,
            borderColor: "#DA471F",
          }}
        />
        <div className="py-3">
          <p className="text-center m-1">
            This Application is developed within the{" "}
            <Link href="https://hpi.de/studium/lehrveranstaltungen/it-systems-engineering-ba/lehrveranstaltung/wise-20-21-3166-trends-und-konzepte-dynamischer-web_anwendungen.html">
              Trends and Concepts in Dynamic Web-Applications Seminar
            </Link>{" "}
            at the Hasso Plattner Institute.
          </p>
          <p className="text-center">
            See the <Link href="https://hpi.de/impressum.html">imprint</Link>.
          </p>
        </div>
      </Container>
    </main>
  )
}

const InfoSection = ({ title, description, link, buttonText }) => {
  return (
    <Col sm={4} className="mt-3">
      <Link href={link}>
        <Button
          data-tip={description}
          data-offset="{'top': 20}"
          variant="outline-secondary"
          className="m-2"
          size="lg"
        >
          {buttonText}
        </Button>
      </Link>
    </Col>
  )
}

const IntroSection = ({ user }) => {
  return (
    <section style={{ backgroundColor: "#FFEEE6" }}>
      <Container>
        <Row>
          <Col sm={7}>
            <h2 className="py-4">Hey there {user?.name}!</h2>
            <h4 className="py-4">
              It's time to organize your meetings. I am Kalle and my mission is to help you doing
              this. Bubble that my friend!
            </h4>
          </Col>
          <Col sm={5} style={{ display: "flex" }} className="justify-content-center">
            <img alt="logo" src="/logo.png" width="60%" height="auto" className="align-self-end" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="text-left">Let's get started: </h4>
          </Col>
        </Row>
        <Row className="text-center pb-5">
          <InfoSection
            title="Connect a calendar"
            description="Kalle uses your calendars to show your invitees when you are available."
            link="/calendars"
            buttonText="1. Connect a Calendar"
          />
          <InfoSection
            title="Set a schedule"
            description="You can add schedules set general time windows where you are available. For example
              weekdays from 9:00 to 17:00."
            link="/schedules"
            buttonText="2. Add a Schedule"
          />
          <InfoSection
            title="Create a Meeting"
            description="Create a Meeting to schedule an appointment."
            link="/meeting/create"
            buttonText="3. Create a Meeting"
          />
        </Row>
      </Container>
    </section>
  )
}

const OverviewBox = (props: { span; header; children }) => {
  return (
    <Col sm={props.span} className="p-3">
      <Col sm={12} className="p-3 rounded shadow">
        <div>
          <div>
            {props.header}
            <hr></hr>
          </div>
          <div style={{ minHeight: "300px" }}>{props.children}</div>
        </div>
      </Col>
    </Col>
  )
}

const MeetingOverviewBox = ({ meeting }) => {
  const href = `/schedule/${meeting.ownerName}/${meeting.link}`
  const hrefToDisplay = getOrigin() + href
  return (
    <Col md={6} className="my-1" style={{ display: "flex" }}>
      <Card
        key={meeting.id + meeting.ownerName + meeting.name}
        id={"" + meeting.id}
        className="p-3 my-2 text-left"
        style={{ width: "100%" }}
      >
        <Row>
          <Col md={12}>
            <h5 className="font-weight-bold">
              {meeting.name} ({meeting.duration}min){" "}
            </h5>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col className="my-auto pb-1">
            <p className="my-auto">Active until: {format(meeting.endDate, "dd.MM.yyy")}</p>
          </Col>
        </Row>
        <Row className="mt-4 justify-content-end">
          <Col>
            <Link href={"/meeting/bookings/" + meeting.id}>
              <Button variant="outline-primary">View Bookings</Button>
            </Link>
            <CopyToClipboard text={hrefToDisplay} className="ml-3">
              <Button variant="outline-primary">Copy Link</Button>
            </CopyToClipboard>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

const OverviewSection = ({ meetings, appointments }) => {
  return (
    <section style={{ minHeight: "70vh" }}>
      <Container className="pt-4">
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
            <Row style={{ display: "flex", flexWrap: "wrap" }}>
              {meetings?.map((meeting: Meeting) => {
                return <MeetingOverviewBox meeting={meeting} />
              })}
            </Row>
          </OverviewBox>
          <OverviewBox span={5} header={<h4>Upcoming appointments</h4>}>
            {appointments.length === 0 ? (
              <p className="text-center">No upcoming appointments</p>
            ) : (
              appointments.map((appointment: Booking & { meeting: Meeting }) => {
                return (
                  <>
                    <Row className="py-2">
                      <Col xs={8}>
                        <Row>
                          <Col xs={5}>
                            <b>{format(appointment.date, "dd.MM HH:mm")}</b>
                          </Col>
                          <Col xs={7}>{appointment.meeting.name}</Col>
                        </Row>
                      </Col>
                      <Col xs={4}>
                        <Link
                          href={
                            "/meeting/bookings/" + appointment.meetingId + "/#" + appointment.id
                          }
                        >
                          <Button variant="primary" className="m-1 float-md-right">
                            Details
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                    <hr></hr>
                  </>
                )
              })
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
  const [appointments] = useQuery(getUpcomingBookings, 10)

  return (
    <main className="text">
      <IntroSection user={user} />
      <OverviewSection meetings={meetings} appointments={appointments} />
      <ReactTooltip />
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
