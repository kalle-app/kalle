import { useCurrentUser } from "app/hooks/useCurrentUser"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
// TODO: add proper Form and mutation
//TODO: add user name

const UserDataForm = () => {
  const currentUser = useCurrentUser()
  return (
    <Form className="m-3">
      <Form.Group controlId="formName">
        <Form.Label>Full name</Form.Label>
        <Form.Control defaultValue="Name" />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" defaultValue={currentUser?.email} />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group as={Col} controlId="formPassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Form.Row>
    </Form>
  )
}

export default UserDataForm
