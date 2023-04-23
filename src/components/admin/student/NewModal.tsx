import { ChangeEvent, useState } from "react";
import { Form, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  save: (data: { name: string; email: string }) => void;
}

export const NewStudentModal = ({ show, onHide, save }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSaveClick = () => {
    save({ name, email });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Student</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Student Name</Form.Label>
            <Form.Control type="text" value={name} onChange={onNameChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={email} onChange={onEmailChange} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary" onClick={onSaveClick}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};
