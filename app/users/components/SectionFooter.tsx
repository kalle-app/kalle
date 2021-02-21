import Button from "react-bootstrap/Button"

interface SectionFooterProps {
  id?: string
  text: string
  variant: string
  disabled?: boolean
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
