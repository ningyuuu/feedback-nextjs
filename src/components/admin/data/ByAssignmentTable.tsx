import { useRouter } from "next/router";
import { Table } from "react-bootstrap";

interface Props {
  data: any[];
  by: string;
}

export const AdminDataByTable = ({ data, by }: Props) => {
  const router = useRouter();
  const pid = router.query.id;

  const byLower = by.toLowerCase();
  const byFirstUpper = by.charAt(0).toUpperCase() + by.slice(1);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th style={{ width: "100%" }}>By {byFirstUpper}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.id}>
            <td>
              <div className="w-100 d-flex">
                <div className="flex-grow-1">{d.name}</div>
                <div>
                  <a href={`/admin/project/${pid}/data/${byLower}/${d.id}`}>Edit {byFirstUpper} Data</a>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
