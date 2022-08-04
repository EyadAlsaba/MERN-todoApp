import { useSession, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Projects({ client }) {
  const { data: session } = useSession({ required: true });
  const clientLists = client[0]['client_lists'];
  console.log(...clientLists)
  return (
    <>
      <Head>
        <title>projects</title>
      </Head>
      <div>
        {
          clientLists && clientLists.map((list, index) => {
            return (
              <section key={index}>
                <div>
                  <Link href='/projectTasks'>
                    {list['list_title']}
                  </Link>
                </div>
              </section>
            )
          })
        }
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    try {
      const sendReq = await fetch('http://localhost:3000/api/server/app');
      const clients = await sendReq.json();
      const client = clients.filter(client => client['client_email'] === session.user.email)
      return {
        props: { client }
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    return {
      props: {
        msg: 'client not logged in'
      }
    }
  }

}

