import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet, fetchPost } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/admin/NavBar";

import { useRouter } from "next/router";
import { AdminInstructorTable } from "@/components/admin/instructor/Table";

export default function Courses() {
  const router = useRouter();

  const projectId = router.query.id;

  const [data, setData] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const addInstructor = (data: { id: number }) => {
    fetchPost(`/api/admin/instructors?project=${projectId}`, data).then(() => {
      router.reload();
    });
  };

  const deleteInstructors = () => {
    const ids = selectedData.map((sd) => sd.id);
    fetchPost(`/api/admin/instructors/delete?project=${projectId}`, { ids }).then(() => {
      router.reload();
    });
  };

  useEffect(() => {
    if (!projectId) return;

    fetchGet(`/api/admin/instructors?project=${projectId}`).then((d) => {
      setData(d);
    });
  }, [projectId]);

  useEffect(() => {
    fetchGet(`/api/users`).then((users) => {
      setUsers(users);
    });
  }, []);

  const instructorIds = data.instructors?.map((i: any) => i.id) ?? [];
  const options = users.filter((u) => !instructorIds.includes(u.id));

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
          Edit Instructors: {data.name} | {data.period}
        </h2>
        <AdminInstructorTable
          data={data.instructors ?? []}
          setSelectedData={setSelectedData}
          addInstructorAPICall={addInstructor}
          deleteInstructorsAPICall={deleteInstructors}
          options={options}
        />
      </Container>
    </>
  );
}
