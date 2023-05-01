import { Card, Form } from "react-bootstrap";

interface Props {
  text: string;
  setText: (text: string) => void;
  label: string;
}

export const EditableText = ({ text, label, setText }: Props) => {
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.target.value);
  };
  return (
    <Card className="my-4">
      <Card.Body>
        <h2>{label}</h2>
        <Form.Control as="textarea" value={text} onChange={onChange} />
      </Card.Body>
    </Card>
  );
};
