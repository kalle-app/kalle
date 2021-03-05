import { useQuery } from "blitz"
import { Button } from "react-bootstrap"
import getCcalOAuthUrl from "../queries/createConnection"

const ConnectGoogleCalendarButton = (props) => {
  const [url] = useQuery(getCcalOAuthUrl, undefined)

  return (
    <Button id={props.id} variant="primary" href={url}>
      {props.children}
    </Button>
  )
}

export default ConnectGoogleCalendarButton