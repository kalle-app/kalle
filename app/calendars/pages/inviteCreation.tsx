import { BlitzPage, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import Advanced from "../components/creationSteps/advanced"
import Availability from "../components/creationSteps/availability"
import General from "../components/creationSteps/general"
import getMergedCalendar from "../queries/getMergedCalendar"

enum Steps {
  General,
  Availability,
  Advanced,
}

const InviteCreationContent = () => {
  const [calendar] = useQuery(getMergedCalendar, null)
  const [step, setStep] = useState(Steps.General)
  const stepOrder = [Steps.General, Steps.Availability, Steps.Advanced]

  const renderSwitch = () => {
    switch (step) {
      case Steps.General:
        return <General toNext={next} />
      case Steps.Availability:
        return <Availability toNext={next} stepBack={stepBack} />
      case Steps.Advanced:
        return <Advanced stepBack={stepBack} />
    }
  }

  const next = () => {
    if (step != stepOrder[stepOrder.length - 1]) {
      const cur = stepOrder.indexOf(step)
      setStep(stepOrder[cur + 1])
    }
  }

  const stepBack = (lastStep: Steps) => {
    if (step != stepOrder[0]) {
      const cur = stepOrder.indexOf(step)
      setStep(stepOrder[cur - 1])
    }
  }

  return <div className="bg-white shadow overflow-hidden sm:rounded-lg">{renderSwitch()}</div>
}

const InviteCreation: BlitzPage = () => {
  return (
    <div className="bg-gray-100 flex h-screen">
      <div className="container flex flex-col justify-center mx-auto">
        <Suspense fallback="Loading...">
          <InviteCreationContent />
        </Suspense>
      </div>
    </div>
  )
}

export default InviteCreation
