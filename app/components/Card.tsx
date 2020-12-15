import { FunctionComponent } from "react"

const Card: FunctionComponent = (props) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-5 sm:p-6">
      {props.children}
    </div>
  )
}

export default Card
