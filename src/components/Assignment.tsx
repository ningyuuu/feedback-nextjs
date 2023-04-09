import { Button } from "react-bootstrap";

export const Assignment = ({ data }: any) => {
  return (
    <div className="pt-4">
      <h5>
        {data.name} &nbsp;{" "}
        <Button size="sm" href={`/assignments/${data.id}`}>
          View
        </Button>
      </h5>
    </div>
  );
};
