import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { NewProjectModal } from "./NewProjectModal";

interface Props {
  data: any[];
  setSelectedData: (data: any[]) => void;
  newProjectAPICall: (data: { name: string; period: string }) => void;
}

export const AdminProjectsTable = ({ data, setSelectedData, newProjectAPICall }: Props) => {
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
          <th style={{ width: "38%" }}>Project Name</th>
          <th style={{ width: "20%" }}>Period</th>
          <th style={{ width: "40%" }}>
            <div className="d-flex w-100">
              <div className="flex-grow-1"></div>
              <div className="pe-2">
                <Button onClick={() => setShowModal(true)}>New</Button>
                <NewProjectModal show={showModal} onHide={() => setShowModal(false)} save={newProjectAPICall} />
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
            <td>{d.name}</td>
            <td>{d.period}</td>
            <td className="d-flex w-100">
              <div className="flex-grow-1 text-center">Course</div>
              <div className="flex-grow-1 text-center">Instructors</div>
              <div className="flex-grow-1 text-center">Students</div>
              <div className="flex-grow-1 text-center">Data</div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
