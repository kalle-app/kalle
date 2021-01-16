import Button from "react-bootstrap/Button"

interface SectionFooterProps {
  id: string
  text: string
  action(): void
}

const SectionFooter = (props: SectionFooterProps) => {
  return (
    <div className="p-3 d-flex justify-content-end">
      <Button id={props.id} variant="primary" onClick={props.action}>
        {props.text}
      </Button>
    </div>
  )
}

export default SectionFooter
