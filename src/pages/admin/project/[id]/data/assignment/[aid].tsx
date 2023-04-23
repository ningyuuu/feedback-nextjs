import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/admin/NavBar";

import { useRouter } from "next/router";
import { AdminDataByTable } from "@/components/admin/data/ByAssignmentTable";

export default function Courses() {
  const router = useRouter();

  const projectId = router.query.id;

  const [data, setData] = useState<any>({});

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
          Edit Data: {data.name} | {data.period}
        </h2>
        <AdminDataByTable data={data.assignments ?? []} by="assignment" />
        <AdminDataByTable data={data.instructors ?? []} by="instructor" />
        <AdminDataByTable data={data.students ?? []} by="student" />
      </Container>
    </>
  );
}
