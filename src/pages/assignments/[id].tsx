import Head from "next/head";
import { AppNavBar } from "@/components/UserNavBar";
import { Card, Container } from "react-bootstrap";
import { fetchGet } from "@/lib/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Script } from "@/components/Script";

export default function Assignments() {
  const [data, setData] = useState<any>({ scripts: [] });

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchGet(`/api/assignments/${id}`).then((data) => {
        setData(data);
      });
    }
  }, [id]);

  console.log(data.scripts);

  const scripts = data.scripts.map((s: any) => (
    <Script key={s.id} data={s} doneStatus />
  ));

  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppNavBar />
      <Container className="mt-4">
        <h2>{data.name}</h2>
        <Card className="mt-4">
          <Card.Body>
            <h2>Description</h2>
            {data.description}
          </Card.Body>
        </Card>
        <Card className="mt-4">
          <Card.Body>
            <h2>Scripts</h2>
            <div className="d-flex">{scripts}</div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
