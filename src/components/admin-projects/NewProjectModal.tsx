import { ChangeEvent, useState } from "react";
import { Form, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  save: (data: { name: string; period: string }) => void;
}

export const NewProjectModal = ({ show, onHide, save }: Props) => {
  const [name, setName] = useState("");
  const [period, setPeriod] = useState("");

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPeriod(e.target.value);
  };

  const onSaveClick = () => {
    save({ name, period });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Project</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Project Name</Form.Label>
            <Form.Control type="text" value={name} onChange={onNameChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Period</Form.Label>
            <Form.Control type="text" value={period} onChange={onPeriodChange} />
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
