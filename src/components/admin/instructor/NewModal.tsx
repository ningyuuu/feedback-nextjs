import { ChangeEvent, useState } from "react";
import { Form, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  save: (data: { id: number }) => void;
  options: { id: number; name: string }[];
}

export const NewInstructorModal = ({ show, onHide, save, options }: Props) => {
  const [selection, setSelection] = useState<number | undefined>(undefined);

  const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!Number(e.target.value)) return;
    setSelection(Number(e.target.value));
  };

  const onSaveClick = () => {
    if (!selection) return;
    save({ id: selection });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Instructor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Select onChange={onSelectionChange} value={selection}>
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
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};
