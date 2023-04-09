import { Button } from "react-bootstrap";

interface Props {
  data: any;
  doneStatus?: boolean;
}

export const Script = ({ data, doneStatus = false }: Props) => {
  const variant = doneStatus
    ? data.scriptGrades.length > 0
      ? "success"
      : "warning"
    : "light";

  return (
    <div className="me-2">
      <Button variant={variant} href={`/scripts/${data.id}`}>
        {data.student.name}
      </Button>
    </div>
  );
};
