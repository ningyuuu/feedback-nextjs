import { Button, Card } from "react-bootstrap";
import { VaultAssignment } from "./Assignment";

interface Props {
  data: any;
}

export const VaultProject = ({ data }: Props) => {
  console.log("v", { data });
  return (
    <Card>
      <Card.Body>
        <div className="d-flex">
          <div className="flex-grow-1">
            <h1>
              {data.name} | {data.period}
            </h1>
          </div>
          <div>
            <Button href={`/projects/${data.id}`}>View project</Button>
          </div>
        </div>

        <VaultAssignment name="Common" data={data.snippets} projectId={data.id} />
        {data.assignments.map((a: any) => (
          <VaultAssignment name={a.name} data={a.snippets} assignmentId={a.id} key={a.id} />
        ))}
      </Card.Body>
    </Card>
  );
};
