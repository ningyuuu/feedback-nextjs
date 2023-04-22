import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { useRouter } from "next/router";
import { NewAssignmentModal } from "./NewAssignmentModal";

interface Props {
  data: any[];
  setSelectedData: (data: any[]) => void;
  newAssignmentAPICall: (data: { name: string }) => void;
  deleteAssignmentAPICall: () => void;
}

export const AdminAssignmentsTable = ({
  data,
  setSelectedData,
  newAssignmentAPICall,
  deleteAssignmentAPICall,
}: Props) => {
  const router = useRouter();
  const pid = router.query.id;
  const [selected, setSelected] = useState<boolean[]>([]);
  const [showNewModal, setShowNewModal] = useState(false);
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
    if (data.length === 0) return;
    setSelectedData(data.filter((_, i) => selected[i]));
  }, [selected, data, setSelectedData]);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th style={{ width: "2%" }}>
            <input type="checkbox" checked={allChecked()} onChange={onAllChange} />
          </th>
          <th style={{ width: "68%" }}>Assignment</th>
          <th style={{ width: "30%" }}>
            <div className="d-flex w-100">
              <div className="flex-grow-1"></div>
              <div className="pe-2">
                <Button onClick={() => setShowNewModal(true)}>New</Button>
                <Button className="mx-2" onClick={() => setShowDeleteModal(true)}>
                  Delete Selected
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
            <td>{d.name}</td>
            <td className="text-right w-100">
              <a href={`/admin/project/${pid}/assignments/${d.id}`}>Edit Assignment Details</a>
            </td>
          </tr>
        ))}
      </tbody>
      <NewAssignmentModal show={showNewModal} onHide={() => setShowNewModal(false)} save={newAssignmentAPICall} />
      <DeleteConfirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={deleteAssignmentAPICall}
      />
    </Table>
  );
};
