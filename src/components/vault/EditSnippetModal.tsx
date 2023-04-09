import { fetchPost } from "@/lib/fetch";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { Modal } from "react-bootstrap"

interface Props {
  show: boolean;
  onHide: () => void;
  text: string;
  id: number;
}

export const EditSnippetModal = ({ show, onHide, text, id }: Props) => {
  const [data, setData] = useState('');
  const router = useRouter();

  useEffect(() => {
    setData(text);
  }, [text])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  }

  const save = async () => {
    await fetchPost(`/api/snippets/${id}`, {
      text: data
    })
    router.reload();
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Snippet</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <textarea value={data} onChange={onChange} className="w-100" rows={10} />
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary" onClick={save}>Save</button>
      </Modal.Footer>
    </Modal>
  )
}
