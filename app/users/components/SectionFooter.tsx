import Button from "react-bootstrap/Button"

interface SectionFooterProps {
  text: string
  action: Function
}

const SectionFooter = (props: SectionFooterProps) => {
  return (
    <div className="p-3 d-flex justify-content-end">
      <Button variant="primary" onClick={() => props.action()}>
        {props.text}
      </Button>
    </div>
  )
}

export default SectionFooter
