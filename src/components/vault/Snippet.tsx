import { Button } from "react-bootstrap";

interface Snippet {
  id: number;
  text: string;
}

interface Props {
  data: Snippet;
}

export const Snippet = ({ data }: Props) => {
  return (
    <div className="d-flex my-1">
      <div className="flex-grow-1">{data.text}</div>
      <Button size="sm" className="me-1">Edit</Button>
      <Button size="sm">Delete</Button>
    </div>
  )
}
