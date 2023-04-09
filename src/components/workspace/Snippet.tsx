import { Button, Card } from "react-bootstrap"

interface Props {
  id: number;
  text: string;
}

export const WorkspaceSnippet = ({id , text}: Props) => {
  const copy = () => {
    navigator.clipboard.writeText(text);
  }

  return <Card key={id} className="mt-1">
    <Card.Body>
      <div className="d-flex">
        <div className="flex-grow-1">{text}</div>
        <Button size="sm" onClick={copy}>Copy</Button>
      </div>
    </Card.Body>
  </Card>
}
