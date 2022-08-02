
import { useSession, getSession } from "next-auth/react";
import Head from "next/head";

export default function Projects() {
  const { data: session } = useSession({ required: true });

  return (
    <>
      <Head>
        <title>projects</title>
      </Head>
      <h3>projects page</h3>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   console.log(session);

//   return {
//     props: { session },
//   }
// }

