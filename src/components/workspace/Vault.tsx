import { fetchGet } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { WorkspaceSnippet } from "./Snippet";

interface Props {
  assignmentId: number;
}

export const WorkspaceVault = ({ assignmentId }: Props) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (!assignmentId) {
      return;
    }

    fetchGet(`/api/myvault/${assignmentId}`).then((data) => {
      console.log("myvault", data);
      setData(data);
    });
  }, [assignmentId]);

  const snippets = data.map((s: any) => (
    <WorkspaceSnippet id={s.id} text={s.text} key={s.id} />
  ));

  return (
    <div className="flex-grow-1">
      <h4>Vault</h4>
      {snippets}
    </div>
  );
};
