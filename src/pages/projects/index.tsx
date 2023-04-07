import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { AppNavBar } from '@/components/UserNavBar'
import { fetchGet } from '@/lib/fetch'
import { useEffect, useState } from 'react'
import { Project } from '@/components/Project'

export default function Projects() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetchGet('/api/myprojects').then(data => {
      setData(data);
    })
  }, [])

  const projects = data.map((p: any) => <Project data={p} key={p.id} />)

  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppNavBar />
      <main className={styles.main}>
        {projects}
      </main>
    </>
  )
}
