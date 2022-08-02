import Head from 'next/head'
import Link from 'next/link';
import { useSession } from "next-auth/react"
import Welcome from '@/components/welcome.js';

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="todo app" content="mange your projects simply" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        session ? <Welcome user={session.user} /> :
          <section style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h1>You must be logged in</h1>
            <Link href='/api/auth/signin'>Log in</Link>
          </section>
      }
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/api/server/app');
  const resData = await res.json();
  if (resData) {
    return {
      props: {
        resData
      }
    }
  } else {
    console.error('error fetching data')
  }
}