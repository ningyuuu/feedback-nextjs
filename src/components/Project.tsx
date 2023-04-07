import { Card } from "react-bootstrap"
import { Assignment } from "./Assignment"

export const Project = ({ data }: any) => {
  const scriptCount = data.assignments.reduce((count: number, a: any) => a.scripts.length + count, 0)
  const assignmentCount = data.assignments.length;

  return (
    <Card>
      <Card.Body>
        <h1>{data.name}</h1>
        <div>{data.id} | You have {scriptCount} outstanding scripts in {assignmentCount} assignments.</div>
        {data.assignments.map((a: any) => <Assignment data={a} key={a.id} />)}
      </Card.Body>
    </Card>
  )
}
