import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet, fetchPost } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/AdminNavBar";

import { useRouter } from "next/router";
import { AdminAssignmentsTable } from "@/components/admin-course/AssignmentsTable";

export default function Courses() {
  const router = useRouter();

  const projectId = router.query.id;

  const [data, setData] = useState<any>({});
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const newAssignment = (data: { name: string }) => {
    fetchPost(`/api/admin/assignments?project=${projectId}`, data).then(() => {
      router.reload();
    });
  };

  const deleteAssignments = () => {
    const ids = selectedData.map((sd) => sd.id);
    console.log("deleted IDs", ids);
    fetchPost(`/api/admin/assignments/delete`, { ids }).then(() => {
      router.reload();
    });
  };

  useEffect(() => {
    if (!projectId) return;

    fetchGet(`/api/admin/assignments?project=${projectId}`).then((d) => {
      setData(d);
      console.log({ d });
    });
  }, [projectId]);

  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminNavBar />
      <Container className="mt-4">
        <h2>
          Edit Course: {data.name} | {data.period}
        </h2>
        <AdminAssignmentsTable
          data={data.assignments ?? []}
          setSelectedData={setSelectedData}
          newAssignmentAPICall={newAssignment}
          deleteAssignmentAPICall={deleteAssignments}
        />
      </Container>
    </>
  );
}
