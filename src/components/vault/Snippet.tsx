import { useState } from "react";
import { Button } from "react-bootstrap";
import { EditSnippetModal } from "./EditSnippetModal";

interface Snippet {
  id: number;
  text: string;
}

interface Props {
  data: Snippet;
}

export const Snippet = ({ data }: Props) => {
  const [show, setShow] = useState(false);


  return (
    <div className="d-flex my-1">
      <div className="flex-grow-1">{data.text}</div>
      <Button size="sm" className="me-1" onClick={() => setShow(true)}>Edit</Button>
      <Button size="sm">Delete</Button>
      <EditSnippetModal show={show} onHide={() => setShow(false)} text={data.text} id={data.id}/>
    </div>
  )
}
