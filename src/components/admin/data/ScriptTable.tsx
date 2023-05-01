import { ChangeEvent, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { ResetConfirmation } from "./ResetConfirmation";
import { AssignInstructorModal } from "./AssignInstructorModal";
import { NewScriptModal } from "./NewScriptModal";

interface Props {
  data: any[];
  setSelectedData: (data: any[]) => void;
  onDelete: () => void;
  onReset: () => void;
  onAssign: (id: number) => void;
  onUpload: (data: { file: File; student: number }) => void;
  instructors: { id: number; name: string }[];
  students: { id: number; name: string }[];
}

export const ScriptTable = ({
  data,
  setSelectedData,
  onDelete,
  onReset,
  instructors,
  students,
  onAssign,
  onUpload,
}: Props) => {
  const [selected, setSelected] = useState<boolean[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const getScore = (d: any) => {
    if (d.scriptGrades.length === 0) {
      return "Ungraded";
    }

    let totalScore = 0;
    let currentScore = 0;
    d.scriptGrades.forEach((sg: any) => {
      totalScore += sg.grading.marks;
      currentScore += sg.grade;
    });

    return `${currentScore}/${totalScore}`;
  };

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

  console.log({ data });

  return (
    <>
      <div>
        <Button className="ms-1" onClick={() => setShowAssignModal(true)}>
          Assign instructor
        </Button>
        <AssignInstructorModal
          show={showAssignModal}
          onHide={() => setShowAssignModal(false)}
          options={instructors}
          save={onAssign}
        />

        <Button className="ms-1" onClick={() => setShowUploadModal(true)}>
          Upload more scripts
        </Button>
        <NewScriptModal
          show={showUploadModal}
          onHide={() => setShowUploadModal(false)}
          save={onUpload}
          options={students}
        />

        <Button className="ms-1" onClick={() => setShowResetModal(true)}>
          Reset grading
        </Button>
        <ResetConfirmation show={showResetModal} onHide={() => setShowResetModal(false)} onReset={onReset} />

        <Button className="ms-1" onClick={() => setShowDeleteModal(true)}>
          Delete
        </Button>
        <DeleteConfirmation show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onDelete={onDelete} />
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{ width: "2%" }}>
              <input type="checkbox" checked={allChecked()} onChange={onAllChange} />
            </th>
            <th style={{ width: "28%" }}>Student</th>
            <th style={{ width: "20%" }}>Instructor</th>
            <th style={{ width: "20%" }}>Assignment</th>
            <th style={{ width: "30%" }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={d.id}>
              <td>
                <input type="checkbox" checked={selected[i]} onChange={(e) => onChange(e, i)} />
              </td>
              <td>{d.student.name}</td>
              <td>{d.assignee?.name}</td>
              <td>{d.assignment.name}</td>
              <td>
                <div className="w-100 d-flex">
                  <div className="flex-grow-1">{!!d && getScore(d)}</div>
                  <div>
                    <a href={`/admin/scripts/${d.id}`}>Edit Grading</a>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
