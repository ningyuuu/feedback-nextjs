import { ChangeEvent, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

interface Props {
  data: any[];
  setSelectedData: (data: any[]) => void;
}

export const ScriptTable = ({ data, setSelectedData }: Props) => {
  const [selected, setSelected] = useState<boolean[]>([]);
  const [showModal, setShowModal] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const newSelected = [...selected];
    newSelected[i] = e.target.checked;
    setSelected(newSelected);
  };

  const onAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(data.map(() => e.target.checked));
  };

  const allChecked = () => {
    if (selected.length === 0) return false;
    return selected.every((s) => s);
  };

  useEffect(() => {
    setSelected(data.map(() => false));
  }, [data, setSelected]);

  useEffect(() => {
    setSelectedData(data.filter((_, i) => selected[i]));
  }, [selected, data, setSelectedData]);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th style={{ width: "2%" }}>
            <input type="checkbox" checked={allChecked()} onChange={onAllChange} />
          </th>
          <th style={{ width: "98%" }}>
            <div className="d-flex w-100 ">
              <div className="flex-grow-1">Student</div>
              <div>
                <Button className="ms-1" onClick={() => setShowModal(true)}>
                  Assign instructor
                </Button>
                <Button className="ms-1" onClick={() => setShowModal(true)}>
                  Upload more scripts
                </Button>
                <Button className="ms-1" onClick={() => setShowModal(true)}>
                  Reset grading
                </Button>
                <Button className="ms-1" onClick={() => setShowModal(true)}>
                  Delete
                </Button>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={d.id}>
            <td>
              <input type="checkbox" checked={selected[i]} onChange={(e) => onChange(e, i)} />
            </td>
            <td>
              <div className="w-100 d-flex">
                <div className="flex-grow-1">{d.student.name}</div>
                <div>
                  <a href={`/admin/scripts/${d.id}`}>Edit Grading</a>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
