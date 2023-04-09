import { Button, Card } from "react-bootstrap";
import { Assignment } from "./Assignment";

export const Project = ({ data }: any) => {
  return (
    <Card>
      <Card.Body>
        <h1>
          {data.name} | {data.period} &nbsp; <Button href={`/projects/${data.id}`}>View</Button>
        </h1>
        {data.assignments.map((a: any) => (
          <Assignment data={a} projectId={data.id} key={a.id} />
        ))}
      </Card.Body>
    </Card>
  );
};
