import { Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  text: string;
  setText: React.ChangeEventHandler<HTMLTextAreaElement>;
  save: () => void;
}

export const NewSnippetModal = ({ show, onHide, text, setText, save }: Props) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Snippet</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <textarea value={text} onChange={setText} className="w-100" rows={10} />
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary" onClick={save}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};
