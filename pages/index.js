import Head from 'next/head'
import Link from 'next/link';
import { useSession, getSession } from "next-auth/react"
import Welcome from '@/components/welcome.js';


export default function Home({ clientsData }) {
  const { data: session } = useSession();
  console.log(clientsData)
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

  const session = await getSession(context);
  const res = await fetch('http://localhost:3000/api/server/app');
  const clientsData = await res.json();

  if (clientsData) {

    if (session) {
      const isClientExist = clientsData.some(client => client['client_email'] === session.user.email);
      if (!isClientExist) {

        const newClient = await fetch('http://localhost:3000/api/server/add', {
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