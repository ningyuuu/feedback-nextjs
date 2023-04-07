import { Button } from "react-bootstrap"

export const Script = ({ data }: any) => {
  return (
    <div className="me-4">
      <Button variant="light">
        <h6>{data.student.name}</h6>
      </Button>
    </div>
  )
}
