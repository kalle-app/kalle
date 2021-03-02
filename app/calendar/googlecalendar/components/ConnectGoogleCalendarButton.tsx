import { useQuery } from "blitz"
import { PropsWithChildren } from "react"
import { Button } from "react-bootstrap"
import getCcalOAuthUrl from "../queries/createConnection"

export const ConnectGoogleCalendarButton = (
  props: PropsWithChildren<{
    id: string
  }>
) => {
  const [url] = useQuery(getCcalOAuthUrl, undefined)

  return (
    <Button id={props.id} variant="primary" href={url}>
      {props.children}
    </Button>
  )
}
