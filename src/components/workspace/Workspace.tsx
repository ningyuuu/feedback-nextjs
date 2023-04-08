import { getFullUrl } from "@/lib/fetch"
import { Grading } from "./Grading";
import { GradingInput } from "./GradingInput";
import { useEffect, useState } from "react";

interface Props {
  data: any
}

export const Workspace = ({ data }: Props) => {
  const [currGrading, setCurrGrading] = useState('');
  const [gradingData, setGradingData] = useState({});

  useEffect(() => {
    if (data.assignment.gradings) {
      setCurrGrading(data.assignment.gradings[0].name);
    }
  }, [data.assignment.gradings])


  const student = data.student ? data.student.name : '';
  const assignment = data.assignment ? data.assignment.name : '';

  return <div className="flex-grow-1 d-flex">
    <iframe src={getFullUrl('/api/scripts/file/1')} height="100%" width="50%" />
    <div className="h-100 w-50 ps-2 d-flex flex-column">
      <h2>{student} | {assignment}</h2>
      <p>View and grade an individual assignment.</p>
      <Grading data={data.assignment.gradings} setCurrGrading={setCurrGrading} />
      <GradingInput data={gradingData} currGrading={currGrading} setData={setGradingData} />
    </div>
  </div>
}
