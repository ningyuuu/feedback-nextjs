import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";

interface Props {
  data: any[];
  setSelectedData: (data: any[]) => void;
}

export const AdminProjectsTable = ({ data, setSelectedData }: Props) => {
  const [selected, setSelected] = useState<boolean[]>([]);

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
          <th colSpan={4} style={{ width: "40%" }}>
            Edit
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
            <td>Course</td>
            <td>Instructors</td>
            <td>Students</td>
            <td>Data</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
