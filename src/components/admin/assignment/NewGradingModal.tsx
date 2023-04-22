import { ChangeEvent, useState } from "react";
import { Form, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  save: (data: { name: string; marks: number }) => void;
}

export const NewGradingModal = ({ show, onHide, save }: Props) => {
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onMarksChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMarks(Number(e.target.value).toString() ?? "");
  };

  const onSaveClick = () => {
    save({ name, marks: Number(marks) });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Assignment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control type="text" value={name} onChange={onNameChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Marks</Form.Label>
            <Form.Control type="text" value={marks} onChange={onMarksChange} />
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
