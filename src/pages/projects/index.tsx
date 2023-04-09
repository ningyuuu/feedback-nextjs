import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import { AppNavBar } from "@/components/UserNavBar";
import { fetchGet } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { Project } from "@/components/Project";

export default function Projects() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetchGet("/api/myprojects").then((data) => {
      setData(data);
    });
  }, []);

  const projects = data.map((p: any) => (
    <Row key={p.id}>
      <Project data={p} />
    </Row>
  ));

  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppNavBar />
      <Container className="mt-4">{projects}</Container>
    </>
  );
}
