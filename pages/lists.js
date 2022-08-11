import { useSession, getSession } from "next-auth/react";
import { useContext } from "react";
import { ClientContext } from '@/context/clientHandlers.js';
import { FaPlusCircle } from 'react-icons/fa'
import Styles from "@/styles/Lists.module.css"
import Head from "next/head";
import Link from "next/link";

/*
 * This page aimed to display all the lists the user have!
 * Each list is clickable button, when user click on it, we open new page that holds all the projects listed in!
 * We should provide the user with tool to create new list (like button with + symbol)
 * when user click on + we open new model and user must provide the title of the list   
 * we send new request to file uses the clientList schema to create new instance !!
*/

export default function Projects({ clientLists }) {
  const { data: session } = useSession({ required: true });
  const clientContext = useContext(ClientContext);
  // console.log(Styles)
  if (session) {
    return (
      <>
        <Head>
          <title>projects</title>
        </Head>
        {/* 
        <h4>test</h4> 
        <div className={Styles.wrapper}>
        </div>
        
        */}


        {
          clientLists && clientLists.map((list, index) => {
            return (
              <section key={index} className={Styles.section}>
                <div className={Styles.div}>

                  <Link href={`/${list['list_title']}`}>
                    <a className={Styles.listTitle}>
                      {list['list_title']}
                    </a>
                  </Link>
                </div>
                <div className={Styles.div}>
                  <Link href={`/${list['list_title']}`}>
                    <a className={Styles.plus}>
                      <FaPlusCircle />
                    </a>
                  </Link>
                </div>
              </section>
            )
          })
        }

      </>
    )
  }
}

export async function getServerSideProps(context) {
  const clientInfo = await getSession(context);
  const request = await fetch(`http://localhost:3000/api/server/getLists`)
  const data = await request.json();
  const clientLists = data.filter(client => client.clientId === clientInfo.user.email);
  // console.log(clientLists)
  return {
    props: {
      clientLists
    }
  }

}
