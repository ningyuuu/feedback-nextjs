import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet, fetchPost, fetchPostFile } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/admin/NavBar";

import { useRouter } from "next/router";
import { ScriptTable } from "@/components/admin/data/ScriptTable";

export default function Courses() {
  const router = useRouter();

  const { aid } = router.query;

  const [data, setData] = useState<any>({});
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const onDelete = () => {
    const ids = selectedData.map((d) => d.id);
    fetchPost(`/api/admin/scripts/delete?assignment=${aid}`, { ids }).then(() => {
      router.reload();
    });
  };

  const onReset = () => {
    const ids = selectedData.map((d) => d.id);
    fetchPost(`/api/admin/scripts/reset?assignment=${aid}`, { ids }).then(() => {
      router.reload();
    });
  };

  const onAssign = (instructor: number) => {
    const ids = selectedData.map((d) => d.id);
    fetchPost(`/api/admin/scripts/assign?assignment=${aid}`, { ids, instructor }).then(() => {
      router.reload();
    });
  };

  const onUpload = (data: { file: File; student: number }) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("fileName", data.file.name);
    formData.append("student", data.student.toString());
    fetchPostFile(`/api/admin/scripts/upload?assignment=${aid}`, formData).then(() => {
      router.reload();
    });
  };

  useEffect(() => {
    if (!aid) return;

    fetchGet(`/api/admin/data/assignment/${aid}`).then((d) => {
      setData(d);
      console.log({ d });
    });
  }, [aid]);

  const studentsWithScripts = data.scripts?.map((s: any) => s.student.name) ?? [];
  const students = data.project?.students?.filter((s: any) => !studentsWithScripts.includes(s.name)) ?? [];

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
          Edit Data: {data.project?.name} | {data.project?.period}
        </h2>
        <h3 className="py-2">{data.name}</h3>
        <ScriptTable
          data={data.scripts ?? []}
          setSelectedData={setSelectedData}
          onDelete={onDelete}
          onReset={onReset}
          onAssign={onAssign}
          onUpload={onUpload}
          instructors={data.project?.instructors ?? []}
          students={students}
        />
      </Container>
    </>
  );
}
