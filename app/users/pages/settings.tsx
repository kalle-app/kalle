import Layout from "app/layouts/Layout"
import SectionHeader from "app/users/components/SectionHeader"
import UserDataForm from "app/users/components/UserDataForm"
import { BlitzPage, useMutation, useRouter } from "blitz"
import React, { Suspense } from "react"
import Card from "react-bootstrap/Card"
import SectionFooter from "app/users/components/SectionFooter"
import Skeleton from "react-loading-skeleton"
import AuthError from "app/components/AuthError"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import deleteUserMutation from "../mutations/deleteUser"
import logoutMutation from "app/auth/mutations/logout"

const PersonalInformation = () => {
  return (
    <Card className="mt-4">
      <SectionHeader title="Personal Information" subtitle="Change your account information here" />
      <UserDataForm />
      <SectionFooter
        id="update"
        text="Update Information"
        variant="primary"
        action={() => alert("Test")}
      />
    </Card>
  )
}

const DangerZone = () => {
  const router = useRouter()
  const [deleteUser] = useMutation(deleteUserMutation)
  const [logout] = useMutation(logoutMutation)
  const user = useCurrentUser()

  const submitDeletion = async () => {
    await deleteUser(user?.id)
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
