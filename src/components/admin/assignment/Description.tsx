import { Card } from "react-bootstrap";

interface Props {
  description: string;
}

export const Description = ({ description }: Props) => {
  return (
    <Card className="my-4">
      <Card.Body>
        <h2>Description</h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Card.Body>
    </Card>
  );
};
