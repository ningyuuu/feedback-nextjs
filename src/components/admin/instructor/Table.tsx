import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { NewInstructorModal } from "./NewModal";
import { DeleteConfirmation } from "./DeleteConfirmation";

interface Props {
  data: any[];
  setSelectedData: (data: any[]) => void;
  addInstructorAPICall: (data: { id: number }) => void;
  deleteInstructorsAPICall: () => void;
  options: { id: number; name: string }[];
}

export const AdminInstructorTable = ({
  data,
  setSelectedData,
  addInstructorAPICall,
  deleteInstructorsAPICall,
  options,
}: Props) => {
  const [selected, setSelected] = useState<boolean[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    if (!data || data.length === 0) return;
    setSelectedData(data.filter((_, i) => selected[i]));
  }, [selected, data, setSelectedData]);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th style={{ width: "2%" }}>
            <input type="checkbox" checked={allChecked()} onChange={onAllChange} />
          </th>
          <th style={{ width: "38%" }}>Instructor</th>
          <th style={{ width: "20%" }}>Email</th>
          <th style={{ width: "40%" }}>
            <div className="d-flex w-100">
              <div className="flex-grow-1"></div>
              <Button className="me-2" onClick={() => setShowAddModal(true)}>
                Add
              </Button>
              <Button onClick={() => setShowDeleteModal(true)}>Delete Selected</Button>
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
            <td colSpan={2}>{d.login}</td>
          </tr>
        ))}
      </tbody>
      <DeleteConfirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={deleteInstructorsAPICall}
      />
      <NewInstructorModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        save={addInstructorAPICall}
        options={options}
      />
    </Table>
  );
};
