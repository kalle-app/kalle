type ModalProps = {
  title: string
  submitTitle: string
  children: any
}

const Modal = (props: ModalProps) => {
  return <div>{props.children}</div>
}

export default Modal
