import { useQuery } from "blitz"
import { Button } from "react-bootstrap"
import createConnection from "../queries/createConnection"

const ConnectGoogleCalendarButton = (props) => {
  const [url] = useQuery(createConnection, undefined)

  return (
    <Button id={props.id} variant="primary" href={url}>
      {props.children}
    </Button>
  )
}

export default ConnectGoogleCalendarButton
