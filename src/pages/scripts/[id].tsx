import Head from 'next/head'
import { AppNavBar } from '@/components/UserNavBar'
import { Container } from 'react-bootstrap'
import { fetchGet } from '@/lib/fetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Workspace } from '@/components/workspace/Workspace';

export default function Assignments() {
  const [data, setData] = useState<any>({ assignment: {}, student: {} });

  const router= useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchGet(`/api/scripts/${id}`).then(data => {
        setData(data);
      })
    }
  }, [id])

  console.log({ data })

  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppNavBar />
      <Container>
        <div className="d-flex flex-column vh-100">
          <div className="mt-4"></div>
          <Workspace data={data} />
          <div className="mt-5"></div>
        </div>
      </Container>
    </>
  )
}
