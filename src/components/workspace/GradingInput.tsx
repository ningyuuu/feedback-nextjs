import { ChangeEvent } from "react";

interface Props {
  data: any;
  currGrading: number;
  gradings: any;
  setData: (string: any) => void;
}

export const GradingInput = ({ data, setData, currGrading, gradings = [] }: Props) => {
  const updateText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      [currGrading]: {
        description: e.target.value,
        grade: data[currGrading]?.grade || null,
      },
    });
  };

  const currGradingObj = gradings.length > 0 ? gradings.filter((g: any) => g.id === currGrading)[0] : null;
  const gradingName = currGradingObj ? currGradingObj.name : "";

  console.log({ currGradingObj });

  const updateGrade = (e: ChangeEvent<HTMLInputElement>) => {
    let grade: number | null = Number(e.target.value);
    if (isNaN(grade)) {
      grade = null;
    } else if (grade > currGradingObj.marks) {
      grade = currGradingObj.marks;
    }

    console.log({ grade });

    setData({
      ...data,
      [currGrading]: {
        description: data[currGrading]?.description,
        grade,
      },
    });
  };

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <div>
        {gradingName}: <input value={data[currGrading]?.grade ?? ""} onChange={updateGrade} />
      </div>
      <textarea
        value={data[currGrading]?.description ?? ""}
        className="form-control flex-grow-1"
        onChange={(e) => updateText(e)}
      />
    </div>
  );
};
