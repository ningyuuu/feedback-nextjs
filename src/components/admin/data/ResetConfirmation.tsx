import { Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  onReset: () => void;
}

export const ResetConfirmation = ({ show, onHide, onReset }: Props) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Reset grading</Modal.Title>
      </Modal.Header>

      <Modal.Body>Are you sure you want to reset grading for selected script(s)?</Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary" onClick={onReset}>
          Reset
        </button>
      </Modal.Footer>
    </Modal>
  );
};
