import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet, fetchPost } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/admin/NavBar";

import { useRouter } from "next/router";
import { AdminStudentTable } from "@/components/admin/student/Table";

export default function Courses() {
  const router = useRouter();

  const projectId = router.query.id;

  const [data, setData] = useState<any>({});
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const addStudent = (data: { name: string; email: string }) => {
    fetchPost(`/api/admin/students?project=${projectId}`, data).then(() => {
      router.reload();
    });
  };

  const deleteStudents = () => {
    const ids = selectedData.map((sd) => sd.id);
    console.log({ ids });
    fetchPost(`/api/admin/students/delete?project=${projectId}`, { ids }).then(() => {
      router.reload();
    });
  };

  useEffect(() => {
    if (!projectId) return;

    fetchGet(`/api/admin/students?project=${projectId}`).then((d) => {
      setData(d);
      console.log({ d });
    });
  }, [projectId]);

  console.log({ data: data.students });

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
          Edit Students: {data.name} | {data.period}
        </h2>
        <AdminStudentTable
          data={data.students ?? []}
          setSelectedData={setSelectedData}
          addStudentAPICall={addStudent}
          deleteStudentsAPICall={deleteStudents}
        />
      </Container>
    </>
  );
}
