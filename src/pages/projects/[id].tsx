import Head from 'next/head'
import { Container, Row } from 'react-bootstrap'
import { AppNavBar } from '@/components/UserNavBar'
import { fetchGet } from '@/lib/fetch'
import { useEffect, useState } from 'react'
import { AssignmentWithScripts } from '@/components/AssignmentWithScripts'

export default function Projects() {
  const [data, setData] = useState<any>({ assignments: [] });

  useEffect(() => {
    fetchGet('/api/projects/1').then(data => {
      console.log({ data })
      setData(data);
    })
  }, [])

  const assignments = data.assignments.map((a: any) => <Row key={a.id}><AssignmentWithScripts data={a} /></Row>)

  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppNavBar />
      <Container className="pt-4">
        <h1>{data.name} | {data.period}</h1>
        <p>View all assignments for this project.</p>
        {assignments}
      </Container>
    </>
  )
}
