import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet, fetchPost } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/admin/NavBar";

import { useRouter } from "next/router";

export default function Courses() {
  const router = useRouter();
  const { aid } = router.query;

  const [data, setData] = useState<any>({});

  const saveAssignment = (data: { description: string }) => {
    fetchPost(`/api/admin/assignments/${aid}`, data).then(() => {
      router.reload();
    });
  };

  useEffect(() => {
    if (!aid) return;

    fetchGet(`/api/admin/assignments/${aid}`).then((d) => {
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
          Edit Assignment: {data.name} | {data.period}
        </h2>
      </Container>
    </>
  );
}
