import { useSession } from "next-auth/react"
import { ClientContext } from '@/context/clientHandlers';
import { useContext, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Welcome from '@/components/welcome.js';

export default function Home() {
  const { data: session } = useSession();
  const { createClientProfile } = useContext(ClientContext);

  useEffect(() => {
    if (session) {
      createClientProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session == null])

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="todo app" content="mange your projects simply" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='homeSections'>
        <h1>
          Organize your<br />
          projects and life, finally.
        </h1>
        <p>Check is task manager you can trust for life</p>
        <p>Become focused, organized, and calm with Check. The world’s #1 task manager and to-do list app.</p>
      </section>
      {
        session ? <Welcome user={session.user} /> :
          <section className='homeSections'>
            <h1>you are not logged in</h1>
            <Link href='/auth/signIn'>Log in</Link>
          </section>
      }
    </>
  )
}
