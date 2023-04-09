import { Button, Card } from "react-bootstrap"
import { VaultAssignment } from "./Assignment"

export const VaultProject = ({ data }: any) => {

  return (
    <Card>
      <Card.Body>
        <h1>{data.name} | {data.period} &nbsp; <Button href={`/projects/${data.id}`}>View</Button></h1>
        <VaultAssignment name="Common" data={data.snippets} />
        {data.assignments.map((a: any) => <VaultAssignment name={a.name} data={a.snippets} key={a.id} />)}
      </Card.Body>
    </Card>
  )
}
