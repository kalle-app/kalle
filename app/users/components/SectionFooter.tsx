import Button from "react-bootstrap/Button"

interface SectionFooterProps {
  text: string
}

const SectionFooter = (props: SectionFooterProps) => {
  return (
    <div className="p-3 d-flex justify-content-end">
      <Button variant="primary" className="">
        {props.text}
      </Button>
    </div>
  )
}

export default SectionFooter
