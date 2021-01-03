import { useQuery } from "blitz"
import { Button } from "react-bootstrap"
import createConnection from "../oauth/queries/createConnection"

const ConnectGoogleCalendarButton = (props) => {
  const [url] = useQuery(createConnection, undefined)

  return (
    <Button variant="primary" href={url}>
      {props.children}
    </Button>
  )
}

export default ConnectGoogleCalendarButton
