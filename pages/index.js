import Head from 'next/head'
import Link from 'next/link';
import { useSession, getSession } from "next-auth/react"
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
            <Link href='/auth/signin'>Log in</Link>
          </section>
      }
    </>
  )
}

export async function getServerSideProps(context) {

  const session = await getSession(context);
  const req = await fetch('http://localhost:3000/api/server/app');
  const clientsData = await req.json();

  if (clientsData) {

    if (session) {
      const isClientExist = clientsData.some(client => client['client_email'] === session.user.email);
      if (!isClientExist) {

        const newClient = await fetch('http://localhost:3000/api/server/createInstance', {
          body: JSON.stringify({
            'email': session.user.email
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: 'POST'
        })
        await newClient.json();
      }
    }

    return {
      props: {
        clientsData,
      }
    }

  } else {
    console.error('error fetching data')
  }
}