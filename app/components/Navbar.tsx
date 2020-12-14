import logoutMutation from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link, useMutation } from "blitz"
import { Suspense, useState } from "react"
import { SecondaryLink, TertiaryLink } from "./Links"
import React from "react"

interface CustomSignOutButtonProps {
  className: string
}

const CustomSignOutButton = ({ className }: CustomSignOutButtonProps) => {
  const [logout] = useMutation(logoutMutation)

  return (
    <div className={className} role="menuitem">
      <button
        className={"md:w-full text-left focus:outline-none "}
        onClick={async () => {
          await logout()
        }}
      >
        Sign out
      </button>
    </div>
  )
}

function useIsLoggedIn() {
  const currentUser = useCurrentUser()
  return !!currentUser
}

const DesktopNavigation = () => {
  return useIsLoggedIn() ? <DesktopPrivateNavigation /> : <DesktopPublicNavigation />
}

const DesktopPublicNavigation = () => {
  return (
    <div className="ml-10 flex items-baseline space-x-4">
      <Link href="/">
        <TertiaryLink>Home</TertiaryLink>
      </Link>
    </div>
  )
}

const DesktopPrivateNavigation = () => {
  return (
    <div className="ml-10 flex items-baseline space-x-4">
      <Link href="/">
        <TertiaryLink>Home</TertiaryLink>
      </Link>
      <Link href="/meetings/all">
        <TertiaryLink>Meetings</TertiaryLink>
      </Link>
      <Link href="/calendars">
        <TertiaryLink>Calendars</TertiaryLink>
      </Link>
    </div>
  )
}

const DesktopUserMenu = () => {
  const currentUser = useCurrentUser()
  const [profilDropdownOpen, setProfileDropdownOpen] = useState(false)

  if (!currentUser) {
    return (
      <Link href="/login">
        <SecondaryLink>Login</SecondaryLink>
      </Link>
    )
  }

  return (
    <div className="ml-3 relative">
      <div>
        <button
          className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu"
          aria-haspopup="true"
          onClick={() => setProfileDropdownOpen(!profilDropdownOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/3/38/Goldfisch_Bloch2.jpg"
            alt="profile"
          />
        </button>
      </div>
      {/* <!-- Profile dropdown --> */}
      {profilDropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <div className="block px-4 py-2 text-base font-bold leading-none text-gray700">
            {currentUser?.email}
          </div>

          {/* <Link href="/">
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Your Profile
            </a>
          </Link> */}

          <Link href="/users/settings">
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Settings
            </a>
          </Link>
          <CustomSignOutButton
            className={"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"}
          />
        </div>
      )}
    </div>
  )
}

const MobileNavBar = () => {
  return useIsLoggedIn() ? <MobilePrivateNavigation /> : <MobilePublicNavigation />
}

const MobilePublicNavigation = () => {
  return (
    <>
      <Link href="/">
        <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">
          Dashboard
        </a>
      </Link>
      <Link href="/login">
        <SecondaryLink>Login</SecondaryLink>
      </Link>
    </>
  )
}

const MobilePrivateNavigation = () => {
  const currentUser = useCurrentUser()!

  return (
    <>
      <Link href="/">
        <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">
          Home
        </a>
      </Link>
      <Link href="/meetings/all">
        <a
          href="/meetings/all"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
        >
          Meetings
        </a>
      </Link>

      <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://upload.wikimedia.org/wikipedia/commons/3/38/Goldfisch_Bloch2.jpg"
              alt="profile"
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-bold leading-none text-gray-700">
              {currentUser?.email}
            </div>
          </div>
        </div>
        <div className="mt-3 px-2 space-y-1">
          {/* <Link href="/">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">
              Your Profile
            </a>
          </Link> */}

          <Link href="/users/settings">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">
              Settings
            </a>
          </Link>

          <CustomSignOutButton
            className={
              "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
            }
          />
        </div>
      </div>
    </>
  )
}

type MobileBlockState = "hidden" | "block"

// inspired by https://tailwindui.com/preview Dark nav with white page header example.
const NavBar = () => {
  const [mobileBlock, setMobileBlock] = React.useState<MobileBlockState>("hidden")

  return (
    <div>
      <nav className="bg-gray-100 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* logo container */}
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="logo.png" alt="Logo" />
              </div>
              <div className="hidden md:block">
                <Suspense fallback={<DesktopPublicNavigation />}>
                  <DesktopNavigation />
                </Suspense>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6"></div>
              <Suspense fallback={null}>
                <DesktopUserMenu />
              </Suspense>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                className=" inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
                onClick={() => {
                  if (mobileBlock === "hidden") setMobileBlock("block")
                  else setMobileBlock("hidden")
                }}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={(mobileBlock === "hidden" ? "block" : "hidden") + " h-6 w-6"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={mobileBlock + " h-6 w-6"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu--> */}
        <div className={mobileBlock + " md:" + mobileBlock}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="mt-3 px-2 space-y-1">
              <Suspense fallback={<MobilePublicNavigation />}>
                <MobileNavBar />
              </Suspense>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar