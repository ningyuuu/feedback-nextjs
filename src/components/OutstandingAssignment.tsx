import { Script } from "./Script"

export const OutstandingAssignment = ({ data }: any) => {
  return (
    <div className="pt-4">
      <h4>{data.name}</h4>
      <div className="d-flex">{data.scripts.map((s: any) => <Script key={s.id} data={s} />)}</div>
    </div>
  )
}
