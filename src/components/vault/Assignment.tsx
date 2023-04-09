import { Button, Card } from "react-bootstrap";
import { Snippet } from "./Snippet";
import { useState } from "react";
import { fetchPost } from "@/lib/fetch";
import { useRouter } from "next/router";
import { NewSnippetModal } from "./NewSnippetModal";

interface Props {
  assignmentId?: number;
  projectId?: number;
  name: string;
  data: any;
}

export const VaultAssignment = ({ name, data, assignmentId, projectId }: Props) => {
  const [snippetText, setSnippetText] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const router = useRouter();

  const newSnippet = async () => {
    if (assignmentId) {
      await fetchPost("/api/snippets", { assignment: assignmentId, text: snippetText });
    } else if (projectId) {
      await fetchPost("/api/snippets", { project: projectId, text: snippetText });
    } else {
      throw new Error("No assignment or project id");
    }
    router.reload();
  };

  return (
    <>
      <Card className="mt-4">
        <Card.Body>
          <div className="d-flex">
            <div className="flex-grow-1">
              <h4>{name}</h4>
            </div>
            <div>
              <Button onClick={() => setModalShow(true)}>New</Button>
            </div>
          </div>
          {data.map((s: any) => (
            <Snippet key={s.id} data={s} />
          ))}
        </Card.Body>
      </Card>
      <NewSnippetModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        text={snippetText}
        setText={(e) => setSnippetText(e.target.value)}
        save={newSnippet}
      />
    </>
  );
};
