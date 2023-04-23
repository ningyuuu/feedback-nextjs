import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/admin/NavBar";

import { useRouter } from "next/router";
import { ScriptTable } from "@/components/admin/data/ScriptTable";

export default function Courses() {
  const router = useRouter();

  const { aid } = router.query;

  const [data, setData] = useState<any>({});
  const [selectedData, setSelectedData] = useState<any[]>([]);

  useEffect(() => {
    if (!aid) return;

    fetchGet(`/api/admin/data/assignment/${aid}`).then((d) => {
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
          Edit Data: {data.name} | {data.period}
        </h2>
        <h3 className="py-2">{data.name}</h3>
        <ScriptTable data={data.scripts ?? []} setSelectedData={setSelectedData} />
      </Container>
    </>
  );
}
