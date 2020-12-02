import logoutMutation from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { useMutation } from "blitz"
import { Suspense } from "react"
import { SecondaryButton, TertiaryButton } from "./buttons"
import React from "react"

type CustomSignOutButtonProps = {
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

const DesktopNavigation = () => {
  const currentUser = useCurrentUser()
  if (!currentUser) return <DesktopPublicNavigation />
  else return <DesktopPrivateNavigation />
}

const DesktopPublicNavigation = () => {
  return (
    <div className="ml-10 flex items-baseline space-x-4">
      <TertiaryButton href={"/"} label={"Home"} />
      <TertiaryButton href={"/pricing"} label={"Pricing"} />
    </div>
  )
}

const DesktopPrivateNavigation = () => {
  return (
    <>
      <div className="ml-10 flex items-baseline space-x-4">
        <TertiaryButton href={"/"} label={"Home"} />
        <TertiaryButton href={"/calendar"} label={"My Calendars"} />
      </div>
    </>
  )
}

const DesktopUserMenu = () => {
  const currentUser = useCurrentUser()

  const [profilDropdownOpen, setProfileDropdownOpen] = React.useState(false)
  return currentUser ? (
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
            alt=""
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
            {currentUser.email}
          </div>
          <a
            href="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Your Profile
          </a>

          <a
            href="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Settings
          </a>
          <CustomSignOutButton
            className={"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"}
          />
        </div>
      )}
    </div>
  ) : (
    <SecondaryButton href={"/auth/login"} label={"Login"} />
  )
}

const MobileNavBar = () => {
  const currentUser = useCurrentUser()
  if (!currentUser) return <MobilePublicNavigation />
  else return <MobilePrivateNavigation />
}

const MobilePublicNavigation = () => {
  return (
    <>
      <a
        href="/"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
      >
        Dashboard
      </a>
      <a
        href="/"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
      >
        Pricing
      </a>
      <SecondaryButton href={"/auth/login"} label={"Login"} />
    </>
  )
}

const MobilePrivateNavigation = () => {
  const currentUser = useCurrentUser()
  return (
    <>
      <>
        <a
          href="/"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
        >
          Dashboard public
        </a>
        <a
          href="/calendar"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
        >
          My Calendars
        </a>
      </>
      <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://upload.wikimedia.org/wikipedia/commons/3/38/Goldfisch_Bloch2.jpg"
              alt=""
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-bold leading-none text-gray-700">
              {currentUser?.email}
            </div>
          </div>
        </div>
        <div className="mt-3 px-2 space-y-1">
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
          >
            Your Profile
          </a>
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
          >
            Settings
          </a>
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

// inspired by https://tailwindui.com/preview Dark nav with white page header example.
const NavBar = () => {
  const [mobileBlock, setMobileBlock] = React.useState("hidden")

  return (
    <Suspense fallback={null}>
      <div>
        <nav className="bg-gray-100 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {/* logo container */}
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://upload.wikimedia.org/wikipedia/commons/3/38/Goldfisch_Bloch2.jpg"
                    alt="Kalle.app Logo"
                  />
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
    </Suspense>
  )
}

export default NavBar
