import { Button, Card } from "react-bootstrap"
import { Script } from "./Script"

export const AssignmentWithScripts = ({ data }: any) => {
  const scripts = data.scripts.map((s: any) => {
    console.log({ s })
    return <Script key={s.id} data={s} doneStatus />
  })
  return (
    <Card className="my-2">
      <Card.Body>
        <h5>{data.name} &nbsp; <Button size="sm" href={`/assignments/${data.id}`}>View details</Button></h5>
        <div className="d-flex">{scripts}</div>
      </Card.Body>
    </Card>
  )
}
