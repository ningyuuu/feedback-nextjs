export const Assignment = ({ data }: any) => {
  console.log({data})
  return (
    <div>
      <div>{data.id}</div>
      <div>{data.name}</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
