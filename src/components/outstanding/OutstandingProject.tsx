import { Card } from "react-bootstrap";
import { OutstandingAssignment } from "./OutstandingAssignment";

export const OutstandingProject = ({ data }: any) => {
  const scriptCount = data.assignments.reduce((count: number, a: any) => a.scripts.length + count, 0);
  const assignmentCount = data.assignments.length;

  return (
    <Card>
      <Card.Body>
        <h1>
          {data.name} | {data.period}
        </h1>
        <div>
          {data.id} | You have {scriptCount} outstanding scripts in {assignmentCount} assignments.
        </div>
        {data.assignments.map((a: any) => (
          <OutstandingAssignment data={a} key={a.id} />
        ))}
      </Card.Body>
    </Card>
  );
};
