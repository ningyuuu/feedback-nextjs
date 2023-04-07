import { Assignment } from "./Assignment"

export const Project = ({ data }: any) => {
  console.log({data})
  return (
    <div>
      <div>{data.id}</div>
      <div>{data.name}</div>
      {data.assignments.map((a: any) => <Assignment data={a} key={a.id} />)}
      <br/><br/>
      full data
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
