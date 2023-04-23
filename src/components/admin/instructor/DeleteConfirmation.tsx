import { Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  onDelete: () => void;
}

export const DeleteConfirmation = ({ show, onHide, onDelete }: Props) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Instructors</Modal.Title>
      </Modal.Header>

      <Modal.Body>Are you sure you want to delete selected instructors(s)?</Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary" onClick={onDelete}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};
