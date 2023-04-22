import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { useRouter } from "next/router";
import { NewGradingModal } from "./NewGradingModal";
import { fetchPost } from "@/lib/fetch";

interface Props {
  data: any[];
  setSelectedData: (data: any[]) => void;
  newCall: (data: { name: string; marks: number }) => void;
  deleteCall: () => void;
}

export const AdminGradingTable = ({ data, setSelectedData, newCall, deleteCall }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState<boolean[]>([]);
  const [currEdit, setCurrEdit] = useState(0);
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

  const closeModal = () => {
    setShowNewModal(false);
    setCurrEdit(0);
  };

  const editCall = (curEdit: number) => {
    if (currEdit === 0) {
      return newCall;
    }
    return (data: { name: string; marks: number }) => editGrading(curEdit, data);
  };

  const editGrading = (id: number, data: { name: string; marks: number }) => {
    fetchPost(`/api/admin/gradings/${id}`, data).then(() => {
      router.reload();
    });
  };

  const initiateEdit = (id: number) => {
    setCurrEdit(id);
    setShowNewModal(true);
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
          <th style={{ width: "38%" }}>Grading</th>
          <th style={{ width: "40%" }}>Allowed Marks</th>
          <th style={{ width: "20%" }}>
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
            <td>{d.marks}</td>
            <td className="text-right w-100">
              <Button onClick={() => initiateEdit(d.id)}>Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
      <NewGradingModal show={showNewModal} onHide={closeModal} save={editCall(currEdit)} />
      <DeleteConfirmation show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onDelete={deleteCall} />
    </Table>
  );
};
