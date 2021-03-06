import { useQuery } from "blitz"
import { Button } from "react-bootstrap"
import getURL from "../queries/getURL"

export const ConnectOutlookCalendarButton = (props) => {
  const [url] = useQuery(getURL, null)

  return (
    <Button id={props.id} variant="primary" href={url}>
      {props.children}
    </Button>
  )
}

export default ConnectOutlookCalendarButton
