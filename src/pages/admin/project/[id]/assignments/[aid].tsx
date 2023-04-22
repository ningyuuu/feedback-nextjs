import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet, fetchPost } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/admin/NavBar";

import { useRouter } from "next/router";
import { Description } from "@/components/admin/assignment/Description";
import { AdminGradingTable } from "@/components/admin/assignment/GradingTable";

export default function Courses() {
  const router = useRouter();
  const { aid } = router.query;

  const [data, setData] = useState<any>({});
  const [selectedData, setSelectedData] = useState<any[]>([]);

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

  useEffect(() => {
    if (!aid) return;

    fetchGet(`/api/admin/gradings?assignment=${aid}`).then((d) => {
      setData(d);
      console.log({ d });
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
        <h2>
          Edit {data.name} | {data.project?.name ?? ""} | {data.project?.period ?? ""}
        </h2>
        <Description description={data.description} />
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
