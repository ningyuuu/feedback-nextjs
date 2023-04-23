import { ChangeEvent, useState } from "react";
import { Form, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  save: (data: { file: File; student: number }) => void;
  options: { id: number; name: string }[];
}

export const NewScriptModal = ({ show, onHide, save, options }: Props) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [studentId, setStudentId] = useState(0);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : undefined);
  };

  const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!Number(e.target.value)) return;
    setStudentId(Number(e.target.value));
  };

  const onSaveClick = () => {
    if (!file || !studentId) return;
    save({ file, student: studentId });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Instructor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Add more scripts</Form.Label>
            <Form.Control type="file" onChange={onFileChange} />
          </Form.Group>

          <Form.Select onChange={onSelectionChange} value={studentId}>
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
