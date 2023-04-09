import Head from "next/head";
import { AppNavBar } from "@/components/UserNavBar";
import { fetchGet } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { OutstandingProject } from "@/components/outstanding/OutstandingProject";
import { Container } from "react-bootstrap";

export default function Home() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetchGet("/api/outstanding").then((data) => {
      setData(data);
    });
  }, []);

  const projects = data.map((p: any) => <OutstandingProject data={p} key={p.id} />);

  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppNavBar />
      <Container className="mt-2">
        <h1>Home</h1>
        {projects}
      </Container>
    </>
  );
}
