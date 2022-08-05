import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ClientContext } from '@/context/clientHandlers.js';

import Head from "next/head";
import Link from "next/link";

export default function Projects() {
  const { data: session } = useSession({ required: true });
  const { client } = useContext(ClientContext);

  if (session) {
    const clientLists = client['client_lists'];
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
}


