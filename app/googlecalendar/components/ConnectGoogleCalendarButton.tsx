import { useQuery } from "blitz"
import { Button } from "react-bootstrap"
import getGcalOAuthConnection from "../queries/createConnection"

const ConnectGoogleCalendarButton = (props) => {
  const [url] = useQuery(getGcalOAuthConnection, null)

  return (
    <Button id={props.id} variant="primary" href={url}>
      {props.children}
    </Button>
  )
}

export default ConnectGoogleCalendarButton
