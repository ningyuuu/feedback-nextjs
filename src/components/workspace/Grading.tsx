import { Button } from "react-bootstrap";

interface Props {
  data: any;
  setCurrGrading: (name: number) => void;
}

export const Grading = ({ data = [], setCurrGrading }: Props) => {
  const gradings = data.map((g: any) => (
    <Button
      onClick={() => setCurrGrading(g.id)}
      className="me-1"
      size="sm"
      key={g.id}
    >
      {g.name}
    </Button>
  ));

  return <div className="d-flex">{gradings}</div>;
};
