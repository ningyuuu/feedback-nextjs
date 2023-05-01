import Head from "next/head";
import { Button, Container } from "react-bootstrap";
import { fetchGet, fetchPost } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/admin/NavBar";

import { useRouter } from "next/router";
import { EditableText } from "@/components/admin/assignment/Description";
import { AdminGradingTable } from "@/components/admin/assignment/GradingTable";

export default function Courses() {
  const router = useRouter();
  const { aid } = router.query;

  const [data, setData] = useState<any>({});
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const createGrading = (data: { name: string; marks: number }) => {
    fetchPost(`/api/admin/gradings?assignment=${aid}`, data).then(() => {
      router.reload();
    });
  };

  const deleteGradings = () => {
    const ids = selectedData.map((sd) => sd.id);
    fetchPost(`/api/admin/gradings/delete`, { ids }).then(() => {
      router.reload();
    });
  };

  const updateAssignment = () => {
    fetchPost(`/api/admin/assignments/${aid}`, { name, description: desc }).then(() => {
      router.reload();
    });
  };

  useEffect(() => {
    if (!aid) return;

    fetchGet(`/api/admin/gradings?assignment=${aid}`).then((d) => {
      setData(d);
      setName(d.name);
      setDesc(d.description);
    });
  }, [aid]);

  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminNavBar />
      <Container className="mt-4">
        <div className="d-flex justify-content-between">
          <h2>
            Edit {data.name} | {data.project?.name ?? ""} | {data.project?.period ?? ""}
          </h2>
          <Button variant="primary" onClick={updateAssignment}>
            Save
          </Button>
        </div>
        <EditableText text={name} setText={setName} label={"Name"} />
        <EditableText text={desc} setText={setDesc} label={"Description"} />
        <AdminGradingTable
          data={data.gradings ?? []}
          setSelectedData={setSelectedData}
          newCall={createGrading}
          deleteCall={deleteGradings}
        />
      </Container>
    </>
  );
}
