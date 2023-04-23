import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet, fetchPost } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/admin/NavBar";

import { AdminProjectsTable } from "@/components/admin/project/Table";
import { useRouter } from "next/router";

export default function AdminPage() {
  const router = useRouter();

  const [data, setData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const newProject = (data: { name: string; period: string }) => {
    fetchPost("/api/admin/projects", data).then(() => {
      router.reload();
    });
  };

  useEffect(() => {
    fetchGet("/api/admin/projects").then((d) => {
      setData(d);
    });
  }, []);

  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminNavBar />
      <Container className="mt-4">
        <h2>Admin Home</h2>
        <AdminProjectsTable data={data} setSelectedData={setSelectedData} newProjectAPICall={newProject} />
      </Container>
    </>
  );
}
