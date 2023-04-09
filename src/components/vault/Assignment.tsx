import { Card } from "react-bootstrap";
import { Snippet } from "./Snippet";

interface Props {
  assignmentId?: number;
  name: string;
  data: any;
}

export const VaultAssignment = ({ name, data }: Props) => {
  return (
    <Card className="mt-4">
      <Card.Body>
        <h4>{name}</h4>
        {data.map((s: any) => (
          <Snippet key={s.id} data={s} />
        ))}
      </Card.Body>
    </Card>
  );
};
