import Button from "react-bootstrap/Button"

interface SectionFooterProps {
  id?: string
  disabled?: boolean
  text: string
  variant: string
  action(): void
}

const SectionFooter = (props: SectionFooterProps) => {
  return (
    <div className="p-3 d-flex justify-content-end">
      <Button
        variant={props.variant}
        onClick={props.action}
        id={props.id}
        disabled={props.disabled ? props.disabled : false}
      >
        {props.text}
      </Button>
    </div>
  )
}

export default SectionFooter
