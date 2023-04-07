import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { AppNavBar } from '@/components/UserNavBar'

export default function Projects() {
  return (
    <>
      <Head>
        <title>QuickFeedback</title>
        <meta name="description" content="Quick feedback builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppNavBar />
      <main className={styles.main}>
        hey
      </main>
    </>
  )
}
