import Head from "next/head";
import { Container } from "react-bootstrap";
import { fetchGet } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { AdminNavBar } from "@/components/AdminNavBar";

const defaultData = [
  {
    id: 1,
    name: "Project 1",
    period: "Fall 2023",
  },
  {
    id: 2,
    name: "Project 2",
    period: "Fall 2023",
  },
  {
    id: 3,
    name: "Project 3",
    period: "Winter 2023",
  },
];
import { AdminProjectsTable } from "@/components/admin-projects/Table";

export default function Projects() {
  const [data, setData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any[]>([]);

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
        <AdminProjectsTable data={data} setSelectedData={setSelectedData} />
      </Container>
    </>
  );
}
