import { ChangeEvent, useState } from "react";
import { Form, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  save: (id: number) => void;
  options: { id: number; name: string }[];
}

export const AssignInstructorModal = ({ show, onHide, save, options }: Props) => {
  const [id, setId] = useState(0);

  const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!Number(e.target.value)) return;
    setId(Number(e.target.value));
  };

  const onSaveClick = () => {
    if (!id) return;
    save(id);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Instructor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Assign a new instructor for the selected script(s)?
        <Form>
          <Form.Select onChange={onSelectionChange} value={id}>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </Form.Select>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary" onClick={onSaveClick}>
          Assign
        </button>
      </Modal.Footer>
    </Modal>
  );
};
