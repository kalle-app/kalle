import { useQuery } from "blitz"
import { Button } from "react-bootstrap"
import getURL from "../queries/getURL"

const ConnectOutlookCalendarButton = (props) => {
  const [url] = useQuery(getURL, undefined)

  return (
    <Button id={props.id} variant="primary" href={url}>
      {props.children}
    </Button>
  )
}

export default ConnectOutlookCalendarButton
