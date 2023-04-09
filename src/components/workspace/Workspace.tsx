import { fetchPost, getFullUrl } from "@/lib/fetch";
import { Grading } from "./Grading";
import { GradingInput } from "./GradingInput";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { WorkspaceVault } from "./Vault";

interface Props {
  data: any;
}

interface ScriptGrade {
  gradingId: number;
  grade: number;
  comments: string;
}

export const Workspace = ({ data }: Props) => {
  const [currGrading, setCurrGrading] = useState(0);
  const [gradingData, setGradingData] = useState<Record<number, any>>({});

  useEffect(() => {
    if (data.assignment.gradings) {
      setCurrGrading(data.assignment.gradings[0].id);
    }
  }, [data.assignment.gradings]);

  const postGrading = async () => {
    const gradings: ScriptGrade[] = [];
    for (const gradingIdStr of Object.keys(gradingData)) {
      const gradingId = Number(gradingIdStr);
      gradings.push({
        gradingId: gradingId,
        comments: gradingData[gradingId].description,
        grade: gradingData[gradingId].grade,
      });
    }

    const response = await fetchPost("/api/scriptgrades/submit", {
      scriptId: data.id,
      gradings,
    });

    console.log({ response });
  };

  const student = data.student ? data.student.name : "";
  const assignment = data.assignment ? data.assignment.name : "";

  return (
    <div className="flex-grow-1 d-flex">
      <iframe
        src={getFullUrl("/api/scripts/file/1")}
        height="100%"
        width="50%"
      />
      <div className="h-100 w-50 ps-2 d-flex flex-column">
        <h2>
          {student} | {assignment} <Button onClick={postGrading}>Submit</Button>
        </h2>
        <p>View and grade an individual assignment.</p>
        <Grading
          data={data.assignment.gradings}
          setCurrGrading={setCurrGrading}
        />
        <GradingInput
          gradings={data.assignment.gradings}
          data={gradingData}
          currGrading={currGrading}
          setData={setGradingData}
        />
        <WorkspaceVault assignmentId={data.assignment.id} />
      </div>
    </div>
  );
};
