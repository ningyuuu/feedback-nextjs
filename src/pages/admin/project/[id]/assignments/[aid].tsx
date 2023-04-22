import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet, fetchPost } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/AdminNavBar";

import { AdminProjectsTable } from "@/components/admin-projects/Table";
import { useRouter } from "next/router";
import { AdminAssignmentsTable } from "@/components/admin-course/AssignmentsTable";

export default function Courses() {
  const router = useRouter();

  const projectId = router.query.id;

  const [data, setData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const newProject = (data: { name: string; period: string }) => {
    fetchPost("/api/admin/assignments", data).then(() => {
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
        <h2>Edit Course: </h2>
        <AdminAssignmentsTable
          data={data}
          setSelectedData={setSelectedData}
          newCourseAPICall={newProject}
          deleteCourseAPICall={() => {
            return;
          }}
        />
      </Container>
    </>
  );
}