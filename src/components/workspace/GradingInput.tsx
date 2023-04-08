import { ChangeEvent } from "react";
import { Button } from "react-bootstrap";

interface Props {
  data: any
  currGrading: string
  setData: (string: any) => void
}

export const GradingInput = ({ data, setData, currGrading='' }: Props) => {
  const updateText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      [currGrading]: e.target.value
    })
  }

  return <>
    <div>{currGrading}</div>
    <textarea value={data[currGrading] ?? ''} className="form-control flex-grow-1" onChange={(e) => updateText(e)}/>
  </>
}
