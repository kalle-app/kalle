import Layout from "app/layouts/Layout"
import ConnectedCalendars from "app/users/components/ConnectedCalendars"
import SectionHeader from "app/users/components/SectionHeader"
import UserDataForm from "app/users/components/UserDataForm"
import { BlitzPage, useQuery, useMutation, useRouter, invalidateQuery } from "blitz"
import React, { Suspense, useState } from "react"
import getConnectedCalendars from "../queries/getConnectedCalendars"
import Card from "react-bootstrap/Card"
import SectionFooter from "app/users/components/SectionFooter"
import AddCalendarModal from "app/users/components/AddCalendar"
import Skeleton from "react-loading-skeleton"
import AuthError from "app/components/AuthError"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import deleteUserMutation from "../mutations/deleteUser"
import logoutMutation from "app/auth/mutations/logout"
import { UpdateUserInput } from "../../auth/validations"
import updateMutation from "../mutations/updateUserData"
import getCurrentUser from "app/users/queries/getCurrentUser"

const CalendarList = () => {
  const [calendarEntries] = useQuery(getConnectedCalendars, null)
  const [showAddCalendarModal, setShowAddCalendarModal] = useState(false)

  return (
    <Card>
      {showAddCalendarModal && <AddCalendarModal onClose={() => setShowAddCalendarModal(false)} />}

      <SectionHeader
        title="My Calendars"
        subtitle="Add Calendars that you want to connect to Kalle"
      />
      <ConnectedCalendars calendars={calendarEntries ? calendarEntries : []} />
      <SectionFooter
        id="add-calendar-button"
        text="Add Calendar"
        variant="primary"
        action={() => setShowAddCalendarModal(true)}
      />
    </Card>
  )
}

const PersonalInformation = () => {
  const [update] = useMutation(updateMutation)
  const [state, setState] = useState("")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const processUpdate = async () => {
    const parseResult = UpdateUserInput.refine((data) => data.password === data.repeatPassword, {
      message: "Passwords don't match",
    }).safeParse({
      name,
      email,
      password,
      repeatPassword,
    })

    if (!parseResult.success) {
      setState("text-danger")
      setMessage(parseResult.error.errors[0].message)
      return
    }

    try {
      await update({ name, email, password, repeatPassword })
      invalidateQuery(getCurrentUser)
      setState("text-success")
      setMessage("You have successfully changed your account information")
    } catch (error) {
      setState("text-danger")
      setMessage(
        "There was an error. Please make sure your e-mail adress is not used by another account."
      )
    }
  }
  return (
    <Card className="mt-4">
      <SectionHeader title="Personal Information" subtitle="Change your account information here" />
      <UserDataForm
        state={state}
        message={message}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
      />
      <SectionFooter
        id="update"
        text="Update Information"
        variant="primary"
        action={() => processUpdate()}
      />
    </Card>
  )
}

const DangerZone = () => {
  const router = useRouter()
  const [deleteUser] = useMutation(deleteUserMutation)
  const [logout] = useMutation(logoutMutation)

  const submitDeletion = async () => {
    await deleteUser()
    await logout()
    router.push("/")
  }

  return (
    <Card className="mt-4">
      <SectionHeader title="Danger Zone" subtitle="Delete your account and all associated data" />
      <SectionFooter text="Delete your Account" variant="danger" action={() => submitDeletion()} />
    </Card>
  )
}

const SettingsContent = () => {
  if (!useCurrentUser()) {
    return <AuthError />
  }

  return (
    <>
      <CalendarList />
      <PersonalInformation />
      <DangerZone />
    </>
  )
}

const Settings: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <SettingsContent />
    </Suspense>
  )
}

Settings.getLayout = (page) => <Layout title="Settings">{page}</Layout>

export default Settings
